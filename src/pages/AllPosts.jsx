import { useEffect, useState } from "react";
import dbService from "../firebase/DatabaseServices";
import PostCard from "../components/PostCard";
import Container from "../components/Container";
import DataLoader from "../components/DataLoader";

function AllPosts() {
  const [posts, setPosts] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    setDataLoading(true);
    const allPosts = await dbService.getAllPosts();
    setPosts(allPosts);
    setDataLoading(false);
  };

  return (
    <>
      <Container>
        <h2 className="text-4xl font-bold mb-5">All Blogs</h2>
        <div className="flex gap-4">
          {dataLoading ? (
            <DataLoader />
          ) : (
            posts &&
            posts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                blogImageRef={post.blogImageRef}
              />
            ))
          )}
        </div>
        <div className="flex justify-center">
          {posts?.length === 0 && (
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
