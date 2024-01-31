import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { addBlog, login, logout } from "./store/authSlice";
import { Outlet, useLocation } from 'react-router-dom'
import auth from './firebase/AuthService'
import Header from './components/header/Header'
import { onAuthStateChanged } from 'firebase/auth'
import DataLoader from './components/DataLoader'
import Loader2 from './components/PageLoader';
import dbService from './firebase/DatabaseServices';


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(true);
  const authStatus = useSelector(state => state.auth.status)

  const getPosts = async () => {
    setPageLoading(true);
    const allPosts = await dbService.getAllPosts();
    if(allPosts){
      dispatch(addBlog(allPosts))
    }else{
      console.log("No post found");
    }
    setPageLoading(false);
  };

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth.auth, (user) => {
      if (user) {
        dispatch(login(user))
        setPageLoading(false);
      } else {
        dispatch(logout())
        setPageLoading(false);
      }
    })

    getPosts();

    return () => unsubscribe();
  }, [])

  return (
    <>
      {!pageLoading ? (
        <>
           { authStatus || location.pathname === "/" ? <Header /> : null}
          <Outlet />
        </>
      ) : <Loader2 />}
    </>
  )
}

export default App
