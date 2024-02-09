import { useEffect, useReducer, useRef, useState } from "react";
import "./post.css";
import { explode1 } from "./animationFunctions";
import dbService from "../../firebase/DatabaseServices";
import { toast } from "react-toastify";
import auth from "../../firebase/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { addLikes } from "../../store/dbSlice";

function BlogLikeBtn({ data }) {
  const dispatch = useDispatch();
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

  const [useLiked, setUserLiked] = useState(false);
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

  const handleUpdateProfile = async () => {
    const blogLikes = likesData.find(dataLike => dataLike.blog === data.slug);
    const currentUserLiked = blogLikes.likes.every(likeUser => likeUser === currentUserId)
    if(blogLikes){
      
      
    }else{
      const likeDetail = {blog : data.slug, likes : [currentUserId]};
      const dataRes = await dbService.addUpdateLike(likeDetail, data.slug)
      if(dataRes){
        dispatch(addLikes(likeDetail));
      }
    }
    
  }


  const checkUserLiked = () => {
    const blogLikes = likesData.find(dataLike => dataLike.blog === data.slug);
    if(blogLikes){
      const checkUserLiked = blogLikes.likes.every(like => like === currentUserId);
      return checkUserLiked;
    }else{
      return false;
    }
  }

  useEffect(() => {
    setUserLiked(checkUserLiked())
  },[likesData])

  return (
    <>
      <button
        className={`rounded-full bg-black h-10 w-10 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black grid place-items-center hover:bg-blue-600 shadow-xl post-like-btn ${
          useLiked ? "post-liked" : ""
        }`}
        title="Edit"
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
