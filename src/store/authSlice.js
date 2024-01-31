import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null,
    blogs : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout : (state) => {
            state.status = false;
            state.userData = null;
        },
        addBlog : (state, action) => {
            state.blogs = action.payload
        },
        updateBlog : (state, action) => {
            state.blogs = [...state.blogs, action.payload]
        },
        deleteBlog:  (state, action) => {
            state.blogs = [...state.blogs, action.payload]
        },
    }
})

export const { login, logout, addBlog, updateBlog, deleteBlog} = authSlice.actions;
export default authSlice.reducer;