import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../firebase/DatabaseServices";
import parse from "html-react-parser";
import DataLoader from "../components/DataLoader";
import storageService from "../firebase/StorageServices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import LazyImage from "../components/LazyImage";
import PageLoader from "../components/PageLoader";
import { deleteBlog } from "../store/dbSlice";
import BlogEditBtn from "../components/blog/BlogEditBtn";
import BlogDeleteBtn from "../components/blog/BlogDeleteBtn";
import BlogLikeBtn from "../components/blog/BlogLikeBtn";

function Post() {
  const [blogData, setBlogData] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState(null);
  const dispatch = useDispatch();

  const param = useParams();

  const getDocument = async () => {
    setDataLoading(true);
    const dataSnap = await dbService.getBlog(param.slug);
    if (dataSnap.exists()) {
      const blogRowData = dataSnap.data();
      const imageURL = await storageService.getDownloadURL(
        blogRowData.blogImageRef
      );
      if (imageURL) {
        setBlogData({ ...blogRowData, image: imageURL });
      } else {
        toast.error("Something went wrong.");
        navigate("/");
      }
    } else {
      navigate("/");
    }
    setDataLoading(false);
  };

  const deleteDocument = async () => {
    const fileDelRef = await storageService.deleteFile(blogData.blogImageRef);
    if (fileDelRef) {
      const deleteBlogRes = await dbService.deleteBlog(blogData.slug);
      if (deleteBlogRes) {
        dispatch(deleteBlog(blogData.slug));
        toast.success("Document deleted successfully.");
        navigate("/");
      }
    }
  };
  useEffect(() => {
    getDocument();
  }, [param]);

  return !dataLoading ? (
    <>
      {
        blogData ? (<div className="mx-auto  max-w-2xl px-3 pb-4">
          <h1 className="text-3xl font-bold capitalize mb-5">
            {blogData?.title}
          </h1>
          <div className="rounded-lg bg-gray-200 p-4 mx-auto  max-w-2xl relative mb-4">
            <LazyImage
              src={blogData?.image}
              alt="Blog Image"
              className="w-full"
              height={427}
              width={640}
              style={{ objectFit: "cover" }}
            />
            {/* <img src={blogData.image} alt="Blog Image" className="w-full" height={427} width={640} style={{objectFit: "cover"}}/> */}
            {blogData?.userId === userData.auth.currentUser.uid && (
              <>
                <div
                  className="absolute right-10 top-10 flex gap-2"
                  style={{
                    backgroundColor: "#ffffff5e",
                    padding: "5px",
                    borderRadius: "30px",
                  }}
                >
                  <BlogEditBtn
                    onClick={() => navigate(`/update-blog/${param.slug}`)}
                  />
                  <BlogDeleteBtn onClick={deleteDocument} />
                </div>
              </>
            )}
            <div
              className="absolute left-8 bottom-8 flex gap-2"
              style={{
                backgroundColor: "#ffffff5e",
                padding: "5px",
                borderRadius: "30px",
              }}
            >
              {
                blogData && <BlogLikeBtn data={blogData} />
              }

            </div>
          </div>

          <hr className="mb-4" />
          <div>{parse(blogData?.content || "")}</div>
        </div>) : null
      }

    </>
  ) : (
    <PageLoader />
  );
}

export default Post;
