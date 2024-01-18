import { useEffect, useState } from "react";
import dbService from "../firebase/DatabaseServices";
import AllArticles from "../components/AllArticles";
import AddEditArticle from "../components/AddEditArticle";


function Articles() {
    const [articles, setArticles] = useState(null);
    const [editArticle, setEditArticle] = useState(null);

    useEffect(() => {
        getSetArticleData();
    },[]);

    function getSetArticleData(){
        dbService.getAllDocs().then((data) => {
            setArticles(data);
          });
    }

    return ( <>
    <div className="bg-white dark:bg-black min-h-lvh">

        <AddEditArticle getSetArticleData={getSetArticleData} editArticle={editArticle} setEditArticle={setEditArticle}/>
        <AllArticles articles={articles} setEditArticle={setEditArticle}/>
    </div>
    </> );
}

export default Articles;