import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignupForm from './components/SignupForm'
import AddArticle from './components/AddEditArticle'
import AllArticles from './components/AllArticles'
import Articles from './pages/Articles'
import UploadImage from './pages/UploadImage'
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";


function App() {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <>
      <SignupForm />
      {/* <AddArticle /> */}
      {/* <AllArticles /> */}
      {/* <Articles /> */}
      {/* <UploadImage /> */}
    </>
  )
}

export default App
