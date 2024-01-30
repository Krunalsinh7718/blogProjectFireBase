import { useEffect, useState } from "react";
import dbService from "../firebase/DatabaseServices";
import PostCard from "../components/PostCard";
import Container from "../components/Container";
import DataLoader from "../components/DataLoader";

function Home() {
  const [posts, setPosts] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const allPosts = await dbService.getAllArticles(
      "isActive",
      "==",
      "active",
      "title",
      "desc",
      3
    );
    console.log("all post res ", allPosts);
    if (allPosts) {
      setPosts(allPosts);
      setDataLoading(false);
    } else {
      setDataLoading(false);
    }
  };

  return (
    <>
      <Container>
        <h2 className="text-4xl font-bold mb-4">Recent Post</h2>
        <div className="flex flex-wrap gap-4 ">
          {dataLoading ? (
            <DataLoader />
          ) : (
            posts &&
            posts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                articleImageRef={post.articleImageRef}
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

export default Home;
