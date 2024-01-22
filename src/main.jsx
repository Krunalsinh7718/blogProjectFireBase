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
        path: "/add-post",
        element: <AuthLayout authentication={true}><AddPost /></AuthLayout>
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
