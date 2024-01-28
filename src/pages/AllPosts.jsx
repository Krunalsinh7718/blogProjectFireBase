import { useEffect, useState } from "react";
import dbService from "../firebase/DatabaseServices";
import PostCard from "../components/PostCard";

function AllPosts() {

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        getPosts();
    },[])
    const getPosts = async () => {
       const allPosts= await dbService.getAllArticles();
       setPosts(allPosts);
    }

    return (<>
        <div className="flex">
            {
        
               posts && posts.map(post => <PostCard key={post.slug} slug={post.slug} title={post.title} articleImageRef={post.articleImageRef}/>)
            }
        </div>
    </>);
}

export default AllPosts;