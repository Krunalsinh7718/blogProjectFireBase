import { useParams } from "react-router-dom";
import AddEditArticle from "../components/AddEditArticle";
import Container from "../components/Container";
import { useEffect, useState } from "react";
import dbService from "../firebase/DatabaseServices";
import { toast } from "react-toastify";
import storageService from "../firebase/StorageServices";


function UpdatePost() {

  const params = useParams();

  const [article, setArticle] = useState(null);

  const getArticleData = async () => {
    const articleSnp = await dbService.getArticle(params.slug);
    if (articleSnp.exists()) {
      console.log("articleSnp ", articleSnp);
      const articleRowData = articleSnp.data();
      const imageURL = await storageService.getDownloadURL(articleRowData.articleImageRef);
      setArticle({...articleRowData , image : imageURL, docId : params.slug});
     
    }else{
      toast.error("Post not available.");
      navigate("/");
    }
  }

  useEffect(() => {
    getArticleData();
  },[params])

  return (
    <>
      <Container>
        {article && <AddEditArticle article={article}/>}
      </Container>
    </>
  );
}

export default UpdatePost;
