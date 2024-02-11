import { useEffect, useState } from "react";
import Rating from "react-rating"
import { addRatings, updateRating } from "../../store/dbSlice";
import { useDispatch, useSelector } from "react-redux";
import dbService from "../../firebase/DatabaseServices";

const StrEmpty = ({ fill }) => <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    height={24}
    width={24}
>
    <path
        stroke={fill ? "#f39c12" : "#fff"}
        fill={fill ? "#f39c12" : "transparent"}
        strokeWidth={1.5}
        d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452-.347 0-.674.15-1.329.452l-.595.274c-2.303 1.06-3.455 1.59-4.22 1.01-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45.28-.213.46-.536.82-1.182l.328-.588Z"
    />
</svg>;
function BlogRating({ data }) {
    const [blogRating, setBlogRating] = useState(0);
    const [ratingDisabled, setRatingDisabled] = useState(false);
    const dispatch = useDispatch();
    const ratingsData = useSelector(state => state.db.ratings);

    const userData = useSelector(state => state.auth.userData);
    const currentUserId = userData.auth.currentUser.uid;

    const handleChangeRating = async (rate) => {
        // setRatingDisabled(true);
        let currentBlogRatingData = ratingsData.find(dataRating => dataRating.blog === data.slug);
        let currentUserRating = currentBlogRatingData?.rating.find(rating => rating.user === currentUserId);
        // console.log("currentBlogRatingData ", ratingsData[0].blog);
        console.log("currentUserRating ", currentUserRating);
        if (currentBlogRatingData) {
            if (currentUserRating) {
                const updatedRatings = currentBlogRatingData.rating.map(mapRating => {
                    if (mapRating.user === currentUserId) {
                        return { user: currentUserId, rating: rate }
                    } else {
                        return mapRating;
                    }
                })
                const ratingDetail = { blog: data.slug, rating: updatedRatings };

                const dataRes = await dbService.addUpdateRating(ratingDetail, data.slug);
                if (dataRes) {
                    dispatch(updateRating(ratingDetail));
                    setRatingDisabled(false);
                } else {
                    setRatingDisabled(false);
                }

            } else {
                const updatedRatings = [...currentBlogRatingData.rating, { user: currentUserId, rating: rate }];
                const ratingDetail = { blog: data.slug, rating: updatedRatings };

                const dataRes = await dbService.addUpdateRating(ratingDetail, data.slug);
                if (dataRes) {
                    dispatch(updateRating(ratingDetail));
                    setRatingDisabled(false);
                } else {
                    setRatingDisabled(false);
                }
            }
        } else {
            const ratingDetail = { blog: data.slug, rating: [{ user: currentUserId, rating: rate }] };
            const dataRes = await dbService.addUpdateRating(ratingDetail, data.slug)
            if (dataRes) {
                dispatch(addRatings(ratingDetail));
                setRatingDisabled(false);
            } else {
                setRatingDisabled(false);
            }
        }
    }

    useEffect(() => {
        const blogRating = ratingsData.find(dataRating => dataRating.blog === data.slug);
        if (blogRating) {
            const checkUserHasRating = blogRating?.rating.find(rating => rating.user === currentUserId);
            if(checkUserHasRating){
                setBlogRating(checkUserHasRating.rating)
            }else{
                setBlogRating(0)
            }
        }else{
            setBlogRating(0)
        }
    },[ratingsData])

    return (<>
        <div className="rating-wrapper">
            <Rating
                initialRating={blogRating}
                emptySymbol={<StrEmpty />}
                fullSymbol={<StrEmpty fill={true} />}
                onChange={(rate) => {
                    handleChangeRating(rate);
                }}
                readonly={ratingDisabled ? true : false}
            />
        </div>

    </>);
}

export default BlogRating;