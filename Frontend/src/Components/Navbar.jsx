import React from 'react'
import {useState, useEffect} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { toast} from "react-hot-toast";   
import LogOut from './LogOut'  

const Navbar = (props) => {
    const {isloggedIn, setIsLoggedIn} = props;
    const Navigate=useNavigate();
    const handlelogout=async()=>{
         //const token=localStorage.getItem("token");
         try{
          
            //localStorage.removeItem("token");
            setIsLoggedIn(false);
            toast.success("Logout Successfully");
            Navigate("/Login");
         }
         catch(error){
            console.error("Logout failed",error);
            toast.error("Logout failed");

         }
    }
  return (
    
      <nav className="flex justify-around bg-gray-800 text-white p-4">
      <Link to="/" className=" flax items-center text-red-50 hover:text-blue-600 transition-colors">
     Home
     </Link>
   
     <Link to="/Favourites" className=" flax items-center text-red-50 hover:text-blue-600 transition-colors">
     Favourites
     </Link>
     <Link to="/job" className=" flax items-center text-red-50 hover:text-blue-600 transition-colors">
     Job
     </Link>
     {isloggedIn ?(
        <button onClick={handlelogout}>
         LogOut</button>
     ):(
      <>
     
         <Link to="/register">
         Register
        </Link>
          <Link to="/Login" className=" flax items-center text-red-50 hover:text-blue-600 transition-colors">
     Login
     </Link>
      </>
     )}
    
    </nav>
      

  )
}

export default Navbar;
