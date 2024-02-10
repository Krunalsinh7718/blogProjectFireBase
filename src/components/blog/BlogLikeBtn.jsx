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
  const btnRef = useRef();
  // const [like, dispatch1] = useReducer( (state, event) => {
  //   // console.log({...data, liked : await state});
  // //   const addBlogRes = dbService.addUpdateBlog({...data, liked : state})
  // //   if (addBlogRes) {
  // //     explode1(event);
  // //   } else {
  // //     toast.error("Something went wrong");
  // //   }
  // //  console.log(state);
  //   return !state;
  // }, false);

  const [userLiked, setUserLiked] = useState(false);
  const likesData = useSelector(state => state.db.likes);

  const userData = useSelector(state => state.auth.userData)
  const currentUserId = userData.auth.currentUser.uid;

  function pushToArray(arr, obj) {
    const index = arr.findIndex((e) => e === obj);

    if (index === -1) {
      arr.push(obj);
    } else {
      arr[index] = obj;
    }
  }

  const handleUpdateProfile = async (event) => {
    console.log(event);
    let blogLikes = likesData.find(dataLike => dataLike.blog === data.slug);
    let currentUserLiked = blogLikes.likes.includes(currentUserId);
    if (blogLikes) {
      if (currentUserLiked) {
        const updatedLikes = blogLikes.likes.filter(like => like !== currentUserId);
        
        const likeDetail = { blog: data.slug, likes: updatedLikes };
        
        const dataRes = await dbService.addUpdateLike(likeDetail, data.slug);
        if (dataRes) {
          dispatch(updateLike(likeDetail));
        }
      } else {
        const updatedLikes = [...blogLikes.likes, currentUserId];
        const likeDetail = { blog: data.slug, likes: updatedLikes };
        
        const dataRes = await dbService.addUpdateLike(likeDetail, data.slug);
        if (dataRes) {
          dispatch(updateLike(likeDetail));
        }
        explode1(event);
      }
    } else {
      const likeDetail = { blog: data.slug, likes: [currentUserId] };
      const dataRes = await dbService.addUpdateLike(likeDetail, data.slug)
      if (dataRes) {
        dispatch(addLikes(likeDetail));
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
      return false;
    }
  }, [likesData])

  return (
    <>
      <button
        className={`rounded-full bg-black h-10 w-10 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black grid place-items-center  shadow-xl post-like-btn ${userLiked ? "post-liked" : ""
          }`}
        title="Edit"
        ref={btnRef}
        onClick={handleUpdateProfile}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height={24}
          width={24}
        >
          <path
            fill="#fff"
            d="M2 9.137C2 14 6.02 16.591 8.962 18.911 10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137Z"
          />
        </svg>
      </button>
    </>
  );
}

export default BlogLikeBtn;
