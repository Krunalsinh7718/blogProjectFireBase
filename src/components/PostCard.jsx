import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import storageService from "../firebase/StorageServices";
import LazyImage from "./LazyImage";

function PostCard({ slug, blogImageRef, title, className }) {

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
      <div className={`w-[300px] rounded-md border shadow hover:shadow-lg bg-white ${className}`}>
        {
          imageUrl &&
          <LazyImage src={imageUrl}
            alt="sdf"
            className="h-[200px] w-full rounded-md object-cover" 
            width={298}
            height={200}/>
        }
        <div className="p-4">
          <h1 className="text-lg font-semibold capitalize">{title}</h1>
        </div>
      </div>
    </Link>
  </>);
}

export default PostCard;