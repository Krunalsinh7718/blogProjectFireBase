import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs : [],
    likes : [],

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
      
    }
})

export const { addBlogs, setBlogs, deleteBlog, addLikes, setLikesInit, updateLike} = dbSlice.actions;
export default dbSlice.reducer;