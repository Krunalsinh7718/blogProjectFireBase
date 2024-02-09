import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from 'react-router-dom'
import auth from './firebase/AuthService'
import Header from './components/header/Header'
import { onAuthStateChanged } from 'firebase/auth'
import DataLoader from './components/DataLoader'
import PageLoader from './components/PageLoader';
import dbService from './firebase/DatabaseServices';
import { login, logout } from "./store/authSlice";
import { addLikes, setBlogs, setLikesInit } from './store/dbSlice';
import { toast } from 'react-toastify';


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(true);
  const authStatus = useSelector(state => state.auth.status)

  const getPosts = async () => {
    setPageLoading(true);
    const allPosts = await dbService.getAllPosts();
    if(allPosts){
      dispatch(setBlogs(allPosts))
    }else{
      toast.error("No post found");
    }
    setPageLoading(false);
  };

  const getLikesInfo = async () => {
    setPageLoading(true);
    const allLikesInfo = await dbService.getAllLikesInfo();
    if(allLikesInfo){
      console.log("allLikesInfo", allLikesInfo);
      dispatch(setLikesInit(allLikesInfo));
    }
  }

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth.auth, (user) => {
      if (user) {
        dispatch(login(user));
        
        setPageLoading(false);
      } else {
        dispatch(logout())
        setPageLoading(false);
      }
    })
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    getPosts();
    getLikesInfo();
  },[])

  return (
    <>
      {!pageLoading ? (
        <>
           { authStatus || location.pathname === "/" ? <Header /> : null}
          <Outlet />
        </>
      ) : <PageLoader />}
    </>
  )
}

export default App
