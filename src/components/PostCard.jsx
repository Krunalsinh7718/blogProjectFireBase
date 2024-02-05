import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import storageService from "../firebase/StorageServices";
import LazyImage from "./LazyImage";
import { timeStamptToDDMMYY, timeStamptToDDMMYYHHMM} from "../util/common-functions"

function PostCard({ slug, blogImageRef, title, className, createdTime }) {

  const [imageUrl, setImageUrl] = useState();

  const getImageUrl = async () => {
    const imageURLRes = await storageService.getDownloadURL(blogImageRef);
    setImageUrl(imageURLRes);
  }

  useEffect(() => {
    getImageUrl();
  }, [])

  return (<>
    <Link to={`/blog/${slug}`}>
      <div className={`w-[300px] border shadow rounded-md hover:shadow-lg bg-white overflow-hidden ${className}`}>
        {
          imageUrl &&
          <LazyImage src={imageUrl}
            alt="Blog Image"
            className="h-[200px] w-full object-cover" 
            width={298}
            height={200}/>
        }
        <div className="p-4 flex flex-wrap justify-between items-center">
          <h1 className="text-lg font-semibold capitalize">{title}</h1>
          <span className="text-xs">{createdTime ? timeStamptToDDMMYY(createdTime) : null }</span>
        </div>
      </div>
    </Link>
  </>);
}

export default PostCard;