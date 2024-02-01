import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Container from "../components/Container";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState(null);

  const storePosts = useSelector(state => state.db.blogs)
  
  useEffect(() => {
    setPosts(storePosts);
    console.log(storePosts);
  }, [storePosts])

  return (
    <>
      <Container>
        <h2 className="text-4xl font-bold mb-5">Recent Blogs</h2>
        <div className="flex flex-wrap gap-4 ">
          {posts && 
            posts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                blogImageRef={post.blogImageRef}
              />
            ))}
        </div>
        <div className="flex justify-center">
          {(posts?.length === 0 || !posts) && (
            <h2 className="p-5 text-center text-2xl font-semibold text-red-600">
              No post found.
            </h2>
          )}
        </div>
      </Container>
    </>
  );
}

export default AllPosts;
