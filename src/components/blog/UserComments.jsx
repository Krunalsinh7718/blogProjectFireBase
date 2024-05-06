import { useEffect, useState } from "react";
import dbService from "../../firebase/DatabaseServices";
import { getRandomNumber } from "../../util/common-functions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../../store/dbSlice";

function UserComments({ blogData, userData }) {
  // console.log(blogData);
  const navigate = useNavigate();
  const [comments, setComments] = useState(blogData.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(blogData);
  },[blogData])

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    let newBlogData;

    // console.log(blogData.comments);
    // console.log(userData.email, comment);
    if (blogData.comments) {
      // debugger;
      newBlogData = {
        ...blogData,
        comments: [
          ...blogData.comments,
          { user: userData.email, comment: comment, id: getRandomNumber() },
        ],
      };
    } else {
      // debugger;
      newBlogData = {
        ...blogData,
        comments: [
          { user: userData.email, comment: comment, id: getRandomNumber() },
        ],
      };
    }
    console.log(newBlogData);
    const addBlogRes = await dbService.addUpdateBlog({...newBlogData})
    if (addBlogRes) {
      toast.success("Post added successfully.");
      // debugger;
      handleUpdatePost();
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleUpdatePost = async () => {
    const allPosts = await dbService.getAllPosts();
    // debugger;
    if (allPosts) {
      await dispatch(setBlogs(allPosts));
      const currentPost = allPosts.find(post => blogData.slug === post.slug);
      const tempArr = [...currentPost.comments].reverse();
      setComments(tempArr);
    } else {
      toast.error("No post found");
    }
  };

  return (
    <>
      <hr className="mb-4" />
      <h4 className="text-2xl font-bold capitalize mb-5">{blogData.comments?.length || 0} Total Comments</h4>
      <form onSubmit={handleCommentSubmit}>
        <div className="flex w-full items-center space-x-2 mb-8">
          <div className="flex-1">
            <textarea
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
              id="message"
              placeholder="Leave us a message"
              cols="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Send
            </button>
          </div>
        </div>
      </form>
      {comments && (
        <div className="comment-list">
          {comments?.map((userComment) => (
            <div className={`flex mb-4 w-full ${userComment.user === userData.email ? 'pl-4' : 'pr-4'}`} key={userComment.id}>
              <div className={`flex w-full flex-col rounded-md border p-4 ${userComment.user === userData.email ? 'bg-gray-100' : 'bg-white'}`}>
                <h6 className="font-semibold mb-2">{userComment.user}</h6>
                <p>
                {userComment.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default UserComments;
