import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import SignIn from './assets/pages/SignIn'
import SignUp from './assets/pages/SignUp'
import Profile from './assets/pages/Profile'
import About from './assets/pages/About'
import Header from './components/Header'
export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="/sign-up" element={<SignUp />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/about" element={<About />}/>
  </Routes> 
  </BrowserRouter> 
  
  )
}
