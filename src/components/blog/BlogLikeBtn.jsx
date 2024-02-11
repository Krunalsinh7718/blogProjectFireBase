import { useEffect, useReducer, useRef, useState } from "react";
import "./post.css";
import { explode1 } from "./animationFunctions";
import dbService from "../../firebase/DatabaseServices";
import { toast } from "react-toastify";
import auth from "../../firebase/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { addLikes, updateLike } from "../../store/dbSlice";

function BlogLikeBtn({ data }) {
  const dispatch = useDispatch();
 

  const [userLiked, setUserLiked] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const likesData = useSelector(state => state.db.likes);

  const userData = useSelector(state => state.auth.userData)
  const currentUserId = userData.auth.currentUser.uid;

  const handleUpdateProfile = async (event) => {
    setLoadingState(true);
    let blogLikes = likesData.find(dataLike => dataLike.blog === data.slug);
    let currentUserLiked = blogLikes?.likes.includes(currentUserId);
    if (blogLikes) {
      if (currentUserLiked) {
        const updatedLikes = blogLikes.likes.filter(like => like !== currentUserId);

        const likeDetail = { blog: data.slug, likes: updatedLikes };

        const dataRes = await dbService.addUpdateLike(likeDetail, data.slug);
        if (dataRes) {
          dispatch(updateLike(likeDetail));
          setLoadingState(false);
        } else {
          setLoadingState(false);
        }
      } else {
        const updatedLikes = [...blogLikes.likes, currentUserId];
        const likeDetail = { blog: data.slug, likes: updatedLikes };

        const dataRes = await dbService.addUpdateLike(likeDetail, data.slug);
        if (dataRes) {
          dispatch(updateLike(likeDetail));
          setLoadingState(false);
        } else {
          setLoadingState(false);
        }
      }
    } else {
      const likeDetail = { blog: data.slug, likes: [currentUserId] };
      const dataRes = await dbService.addUpdateLike(likeDetail, data.slug)
      if (dataRes) {
        dispatch(addLikes(likeDetail));
        setLoadingState(false);
      } else {
        setLoadingState(false);
      }
    }
  }

  useEffect(() => {
    const blogLikes = likesData.find(dataLike => dataLike.blog === data.slug);
    if (blogLikes) {
      const checkUserLiked = blogLikes.likes.includes(currentUserId);
      if (checkUserLiked) {
        setUserLiked(true);
      } else {
        setUserLiked(false)
      }
    } else {
      console.log("No blog likes found")
    }
  }, [likesData])

  return (
    <>
      <button
        onClick={handleUpdateProfile}
        className={`focus:outline-none like  ${loadingState ? "saving" : userLiked ? "liked" : "unliked"}`}>
        <span className="like-icon like-icon-state" aria-label="state" x-text="state" aria-live="polite">
          {userLiked ? "liked" : "unliked"}
        </span>
      </button>
    </>
  );
}

export default BlogLikeBtn;
