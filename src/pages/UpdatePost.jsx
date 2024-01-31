import { useParams } from "react-router-dom";
import AddEditBlog from "../components/AddEditBlog";
import Container from "../components/Container";
import { useEffect, useState } from "react";
import dbService from "../firebase/DatabaseServices";
import { toast } from "react-toastify";
import storageService from "../firebase/StorageServices";
import DataLoader from "../components/DataLoader";
import PageLoader from "../components/PageLoader";


function UpdatePost() {

  const params = useParams();

  const [blog, setBlog] = useState(null);
  const [dataLoading, setDataLoading] = useState(null);

  const getBlogData = async () => {
    setDataLoading(true);
    const blogSnp = await dbService.getBlog(params.slug);
    if(blogSnp.exists()) {
      const blogRowData = blogSnp.data();
      const imageURL = await storageService.getDownloadURL(blogRowData.blogImageRef);
      setBlog({...blogRowData , image : imageURL, docId : params.slug});
     
    }else{
      toast.error("Post not available.");
      navigate("/");
    }
    setDataLoading(false);
  }

  useEffect(() => {
    getBlogData();
  },[params])

  return !dataLoading ? (
    <>
      <Container>
        {blog && <AddEditBlog blog={blog}/>}
      </Container>
    </>
   ) : (
    <PageLoader />
  );
}

export default UpdatePost;
