import { useState, useEffect } from 'react'
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
import { Outlet, useLocation } from 'react-router-dom'
import auth from './firebase/AuthService'
import Header from './components/header/Header'
import { onAuthStateChanged } from 'firebase/auth'
import DataLoader from './components/DataLoader'


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(true);
  const authStatus = useSelector(state => state.auth.status)

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
    return () => unsubscribe();
  }, [])
  return (
    <>
      {!pageLoading ? (
        <>
           { authStatus || location.pathname === "/" ? <Header /> : null}
          <Outlet />
        </>
      ) : <DataLoader />}
    </>
  )
}

export default App
