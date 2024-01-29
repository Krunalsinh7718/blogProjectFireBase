import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import storageService from "../firebase/StorageServices";
import LazyImage from "./LazyImage";

function PostCard({ slug, articleImageRef, title , className}) {

  const [imageUrl, setImageUrl] = useState();

  const getImageUrl = async () => {
    const imageURLRes = await storageService.getDownloadURL(articleImageRef);
    setImageUrl(imageURLRes);
  }

  useEffect(() => {
    getImageUrl();
  }, [])

  return (<>
    <Link to={`/post/${slug}`}>
      <div className={`w-[300px] rounded-md border shadow hover:shadow-lg ${className}`}>
        {
          imageUrl && <img
          src={imageUrl}
          alt="sdf"
          className="h-[200px] w-full rounded-md object-cover"
        />
        }
        <div className="p-4">
          <h1 className="text-lg font-semibold capitalize">{title}</h1>
        </div>
      </div>
    </Link>
  </>);
}

export default PostCard;