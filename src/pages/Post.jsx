import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../firebase/DatabaseServices";
import parse from "html-react-parser";
import DataLoader from "../components/DataLoader";
import storageService from "../firebase/StorageServices";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Post() {
    const [articleData, setArticleData] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    const param = useParams();

    const getDocument = async () => {
        console.log("slug", param.slug);
        const dataSnap = await dbService.getArticle(param.slug);
        if (dataSnap.exists()) {
            const articleRowData = dataSnap.data();
            const imageURL = await storageService.getDownloadURL(articleRowData.articleImageRef);
            if (imageURL) {
                setArticleData({ ...articleRowData, image: imageURL });
            } else {
                toast.error("Something went wrong.");
                navigate("/")
            }
        } else {
            console.log("No such document!");
            navigate("/")
        }
    }

    const deleteDocument = async () => {
        const deleteArticleRes = await dbService.deleteArticle(articleData.slug)
        if(deleteArticleRes){
            toast.success("Document deleted successfully.");
            navigate("/")
        }
    }
    useEffect(() => {
        getDocument();
    }, [param])

    return articleData ? (<>
        <img src={articleData.image} alt="Article Image" />
       
        {
            articleData.userId === userData.auth.currentUser.uid
            && <div>
                <button onClick={() => navigate(`/update-post/${param.slug}`)}>Edit</button>
                <button onClick={deleteDocument}>Delete</button>
            </div>
        }
        <h1>{articleData.title}</h1>
        <hr />
        <div>
            {parse(articleData.content)}
        </div>

    </>) : <DataLoader />
}

export default Post;