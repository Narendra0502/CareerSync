import React from 'react'
import {useState, useEffect} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import { toast} from "react-hot-toast";   
import LogOut from './LogOut'  

const Navbar = (props) => {
    const {isloggedIn, setIsLoggedIn} = props;
    const Navigate=useNavigate();
    const handlelogout=async()=>{
         const token=localStorage.getItem("token");
         try{
            if(token){
                await fetch('http://localhost:4000/auth/logout',{
                    mathod:'POST',
                    headers:{
                        'Authorization':`Bearer ${token}`,
                    }
            });
            }
            localStorage.removeItem("token");
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
    
        <nav>
     <Link to="/">
     Home
     </Link>
     <Link to="/Login">
     Login
     </Link>
     <Link to="/Favourites">
     Favourites
     </Link>
     <Link to="/job">
     Job
     </Link>
     {isloggedIn ?(
        <button onClick={handlelogout}>
        <LogOut/>LogOut</button>
     ):(
        <Link to="/register">
        Register
        </Link>
     )}
    
    </nav>
      

  )
}

export default Navbar;
