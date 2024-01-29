import { useEffect, useState } from "react";
import dbService from "../firebase/DatabaseServices";
import PostCard from "../components/PostCard";
import Container from "../components/Container";

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
    <Container>
    <h2 className="text-4xl font-bold mb-4">All Post</h2>
        <div className="flex gap-4">
            {
        
               posts && posts.map(post => <PostCard key={post.slug} slug={post.slug} title={post.title} articleImageRef={post.articleImageRef}/>)
            }
        </div>
    </Container>
    </>);
}

export default AllPosts;