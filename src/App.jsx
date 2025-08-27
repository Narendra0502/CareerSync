import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'            
import { Toaster } from "react-hot-toast"; 
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";       
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Signup';
import Navbar from './Components/Navbar';
import Favourites from './Components/Favourites';
import JobDetails from './Components/Jobs';


function App() {
  
  const [count, setCount] = useState(0);
  const [isloggedIn, setIsLoggedIn] = useState(true);
  const PrivateRoute = ({ element }) => {
    return isloggedIn ? element : <Navigate to="/Login" replace />
  }
  return (
    <>
    <Routes>
      <Route path="/" element={
        <PrivateRoute element={
          <>
           <Navbar isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} />
           <Home isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </>
          }/>
      } />
      <Route path="/Favourites" element={
        <PrivateRoute element={
          <>
          <Navbar isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} /> 
          <Favourites isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn}/> 
          </>
        } />
      }/>
      <Route path="/job" element={
        <PrivateRoute element={
          <>
           <Navbar isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} />
           <JobDetails isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </>
         
        } />
      } />
        
      

      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
      <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
    </Routes>
      
    </>
  )
}

export default App
