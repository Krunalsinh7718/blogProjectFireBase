import { useReducer } from "react";
import "../../assets/styles/post.css";

function BlogLikeBtn(props) {
  const [like, dispatch] = useReducer((state) => !state, false);

  return (
    <>
      <button
        className={`rounded-full bg-black h-10 w-10 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black grid place-items-center hover:bg-blue-600 shadow-xl post-like-btn ${like ? "post-liked" : ""}`}
        title="Edit"
        {...props}
        onClick={dispatch}
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
