import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs : [],
    likes : [],
    ratings : []
}

const dbSlice = createSlice({
    name : "db",
    initialState,
    reducers : {
        setBlogs : (state, action) => {
            state.blogs = action.payload
        },
        addBlogs : (state, action) => {
            state.blogs = [...state.blogs, action.payload]
        },
        deleteBlog:  (state, action) => {
            state.blogs = state.blogs.filter(blog => blog.slug !== action.payload)
        },
        addLikes : (state, action) => {
            state.likes = [...state.likes, action.payload]
        },
        setLikesInit : (state, action) => {
            state.likes = action.payload
        },
        updateLike : (state, action) => {
            state.likes = state.likes.map( likeData => {
                if(action.payload.blog === likeData.blog){
                    return action.payload
                }else{
                    return likeData;
                }
            })
        },

        addRatings : (state, action) => {
            state.ratings = [...state.ratings, action.payload]
        },
        setRatingsInit : (state, action) => {
            state.ratings = action.payload
        },
        updateRating : (state, action) => {
            state.ratings = state.ratings.map( ratingData => {
                if(action.payload.blog === ratingData.blog){
                    return action.payload
                }else{
                    return ratingData;
                }
            })
        }
      
    }
})

export const { addBlogs, setBlogs, deleteBlog, addLikes, setLikesInit, updateLike, addRatings, setRatingsInit, updateRating} = dbSlice.actions;
export default dbSlice.reducer;