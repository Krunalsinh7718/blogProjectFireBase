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
      
    }
})

export const { addBlogs, setBlogs, deleteBlog, addLikes, setLikesInit} = dbSlice.actions;
export default dbSlice.reducer;