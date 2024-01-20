import { configureStore  } from "@reduxjs/toolkit";
import authSlice from "./authSlice";



const store = configureStore({
    reducer : {
        authSlice
    }, 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // for console error : non-serializable value was detected 
    })


})

export default store;