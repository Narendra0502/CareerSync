
import React,{useState} from 'react'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import {Link, useNavigate } from 'react-router-dom'
import { toast} from "react-hot-toast";  

const Login = (props) => {
  const {setIsLoggedIn} = props;
  const Navigate=useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const [FormData, setFormData] = useState({
    email:"",
    Password:""
  });

  const handleInputChange=(val)=>{
    const {name,value}=val.target;
    setFormData(prev=>({...prev,[name]:value}));
  }
  const submithandler=async(e)=>{
    e.preventDefault();
    try{
         const data=await fetch('http://localhost:5000/auth/Login',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(FormData)
         });
         const val=await data.json();
         if(!val.success){
          return;
         }
         console.log("Reciever data from server",val);
         localStorage.setItem('token',val.token);
         localStorage.setItem('user', JSON.stringify(val.user));
          console.log("login ho gai hai");
         setIsLoggedIn(true);
                  toast.success("Signup Successfully");
                  setTimeout(() => {
                    Navigate("/");
                  }, 800);
    }
    catch(e){
      return;
    }
   
  }
  
  return (
    <div>
      <div> Welcome to CareerSync</div>
      <div> Login Page</div>
      <form onSubmit={submithandler}>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input 
           id="email"
           name="email"
           type="email" required
           value={FormData.email}
           onChange={handleInputChange}
           placeholder='Enter your email'
           />
        </div>
        <div>
          <label htmlFor="Password">Password:</label>
          <input
          id="Password"
          name="Password"
          type="password" required
          value={FormData.Password}
          onChange={handleInputChange}
          placeholder='Enter your password'
          />
          <button 
          type="button"
          onClick={()=>setshowPassword(!showPassword)}
          className='absolute inset-y-0 right-0 px-3 flex items-center text-[#666666] hover:text-[#333333] transition-colors'
          >
           {showPassword ? <IoIosEyeOff className="h-5 w-5" /> : <IoIosEye className="h-5 w-5" />}
        </button>
        </div>
        <button 
         type="submit">
          Login
         </button>
          <div>
            <p>Don't have an account? <span onClick={()=>Navigate("/register")}>Signup</span>
            </p>
          </div>
      </form>

    </div>
  )
}

export default Login
