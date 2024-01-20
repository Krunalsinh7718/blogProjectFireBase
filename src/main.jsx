import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/Signup.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import SignIn from './pages/SignIn.jsx'

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
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes}/>


    </Provider>
  </React.StrictMode>,
)
