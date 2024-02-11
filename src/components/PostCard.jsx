import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import storageService from "../firebase/StorageServices";
import LazyImage from "./LazyImage";
import { timeStamptToDDMMYY, timeStamptToDDMMYYHHMM} from "../util/common-functions"
import * as Icon from 'react-feather';
import { useSelector } from "react-redux";

function PostCard({ slug, blogImageRef, title, className, createdTime }) {

  const [imageUrl, setImageUrl] = useState();
  const [blogLikes, setBlogLikes] = useState(null);
  const [blogAvgRating, setBlogAvgRating] = useState(null);
  const likesInfo = useSelector(state => state.db.likes);
  const ratingsInfo = useSelector(state => state.db.ratings);
  

  const getImageUrl = async () => {
    const imageURLRes = await storageService.getDownloadURL(blogImageRef);
    setImageUrl(imageURLRes);
  }

  useEffect(() => {
    getImageUrl();
  }, [])

  useEffect(() => {
    if(likesInfo){
      const blogHasLikes = likesInfo.find(blog => blog.blog === slug);
      if(blogHasLikes){
        setBlogLikes(blogHasLikes.likes.length);
      }
    }
  },[likesInfo])

  useEffect(() => {
    if(ratingsInfo){
      const blogHasRatings = ratingsInfo.find(blog => blog.blog === slug);
      if(blogHasRatings){
        console.log(blogHasRatings.blog);
        const averageRating = blogHasRatings.rating.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue.rating
            },
            0,
        )
        setBlogAvgRating(averageRating/blogHasRatings.rating.length)
      }
      
    }
  },[ratingsInfo])

  return (<>
    <Link to={`/blog/${slug}`}>
      <div className={`w-[300px] border shadow rounded-md hover:shadow-lg bg-white overflow-hidden ${className}`}>
        <LazyImage src={imageUrl}
          alt="Blog Image"
          className="h-[200px] w-full object-cover" 
          width={298}
          height={200}/>
        
        <div className="p-4">
          <div className="flex flex-wrap justify-between">
            {
              blogLikes && 
              <span class="mb-2 mr-2 inline-block rounded-full bg-red-100 text-red-600 px-3 py-1 text-[10px] font-semibold flex gap-2 items-center">
                <Icon.Heart height={12} width={12} />
                <span>{blogLikes}</span>
              </span>
            }
            {
              blogAvgRating &&
            <span class="mb-2 mr-2 inline-block rounded-full bg-amber-100 text-amber-600 px-3 py-1 text-[10px] font-semibold  flex gap-2 items-center">
              <Icon.Star height={12} width={12} />
              <span>{blogAvgRating}</span>
            </span>
            }
          </div>
          <h1 className="text-lg font-semibold capitalize multiline-dotted-text mb-2" title={title} style={{minHeight : "56px"}}>{title}</h1>
              <span className="text-xs">{createdTime ? timeStamptToDDMMYY(createdTime) : null }</span>
          
        </div>
      </div>
    </Link>
  </>);
}

export default PostCard;