import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignupForm from './components/SignupForm'
import AddArticle from './components/AddEditArticle'
import AllArticles from './components/AllArticles'
import Articles from './pages/Articles'

function App() {

  return (
    <>
      {/* <SignupForm /> */}
      {/* <AddArticle /> */}
      {/* <AllArticles /> */}
      <Articles />
    </>
  )
}

export default App
