import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../firebase/DatabaseServices";
import parse from "html-react-parser";
import DataLoader from "../components/DataLoader";
import storageService from "../firebase/StorageServices";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Container from "../components/Container";
import LazyImage from "../components/LazyImage";

function Post() {
  const [blogData, setBlogData] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState(null);

  const param = useParams();

  const getDocument = async () => {
    setDataLoading(true);
    
    const dataSnap = await dbService.getBlog(param.slug);
    if (dataSnap.exists()) {
      const blogRowData = dataSnap.data();
      console.log("data res :", blogRowData);
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
      console.log("No such document!");
      navigate("/");
    }
    setDataLoading(false);
  };

  const deleteDocument = async () => {
    const deleteBlogRes = await dbService.deleteBlog(blogData.slug);
    if (deleteBlogRes) {
      toast.success("Document deleted successfully.");
      navigate("/");
    }
  };
  useEffect(() => {
    getDocument();
  }, [param]);

  return !dataLoading ? (
    <>
      <div className="mx-auto  max-w-2xl">
        <h1 className="text-3xl font-bold capitalize mb-5">
          {blogData?.title}
        </h1>
        <div className="rounded-lg bg-gray-200 p-4 mx-auto  max-w-2xl relative mb-4">
          <LazyImage src={blogData?.image} alt="Blog Image" className="w-full" height={427} width={640} style={{objectFit: "cover"}}/>
          {/* <img src={blogData.image} alt="Blog Image" className="w-full" height={427} width={640} style={{objectFit: "cover"}}/> */}
          {blogData?.userId === userData.auth.currentUser.uid && (
            <div className="absolute right-10 top-10 flex gap-2">
              <button
                onClick={() => navigate(`/update-blog/${param.slug}`)}
                className="rounded-full bg-black h-10 w-10 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black grid place-items-center hover:bg-blue-600"
                title="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="#fff"
                  viewBox="0 0 24 24"
                  height={16}
                  width={16}
                >
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={deleteDocument}
                className="rounded-full bg-black h-10 w-10 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black grid place-items-center hover:bg-blue-600"
                title="Delete"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  height={16}
                  width={16}
                >
                  <path
                    fill="#fff"
                    d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <hr className="mb-4"/>
        <div>{parse(blogData?.content || "")}</div>
      </div>
    </>
  ) : (
    <DataLoader />
  );
}

export default Post;
