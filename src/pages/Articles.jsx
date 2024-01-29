import { useEffect, useState } from "react";
import dbService from "../firebase/DatabaseServices";
import AllArticles from "../components/AllArticles";
import AddEditArticle from "../components/AddEditArticle";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    getSetArticleData();
  }, []);

  async function getSetArticleData() {
    setDataLoading(true);
    const articleData = await dbService.getAllArticles();
    setArticles(articleData);
    
    setDataLoading(false);
  }


  return (
    <>
      <div className="bg-white dark:bg-black min-h-lvh">
        <AddEditArticle
          getSetArticleData={getSetArticleData}
          editArticle={editArticle}
          setEditArticle={setEditArticle}
        />
        <AllArticles articles={articles} setEditArticle={setEditArticle} dataLoading={dataLoading} getSetArticleData={getSetArticleData}/>
      </div>
    </>
  );
}

export default Articles;
