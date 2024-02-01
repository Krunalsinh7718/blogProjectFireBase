import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs : [],
   

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
      
    }
})

export const { addBlogs, setBlogs, deleteBlog} = dbSlice.actions;
export default dbSlice.reducer;