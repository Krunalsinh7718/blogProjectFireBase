import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx';
import AuthLayout from './components/AuthLayout.jsx'
import SignIn from './pages/SignIn.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPost from './pages/AddPost.jsx'
import Post from './pages/Post.jsx'
import UpdatePost from './pages/UpdatePost.jsx'
import AllPosts from './pages/AllPosts.jsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/signup",
        element: <AuthLayout authentication={false}><SignUp /></AuthLayout>
      },
      {
        path: "/signin",
        element: <AuthLayout authentication={false}><SignIn /></AuthLayout>
      },
      {
        path: "/add-blog",
        element: <AuthLayout authentication={true}><AddPost /></AuthLayout>
      },
      {
        path: "/all-blogs",
        element: <AuthLayout authentication={true}><AllPosts /></AuthLayout>
      },
      {
        path: "/blog/:slug",
        element: <AuthLayout authentication={true}> <Post /> </AuthLayout>
      },
      {
        path: "/update-blog/:slug",
        element: <AuthLayout authentication={true}> <UpdatePost /> </AuthLayout>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes}/>
      <ToastContainer position="bottom-right"/>
    </Provider>
  </React.StrictMode>,
)
