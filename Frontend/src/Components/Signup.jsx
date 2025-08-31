import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {IoIosEye,IoIosEyeOff} from "react-icons/io";
import { toast} from "react-hot-toast";  
const Signup = (props) => {
  const {setIsLoggedIn} = props;
   const Navigate=useNavigate();
   const [showPassword, setshowPassword] = useState(false);
   const [FormData, setFormData] = useState({
    Firstname:"",
    Lastname:"",
    email:"",
    Password:"",
    ConfirmPassword:"",
    Contact:"",  
  });
  const Changehandler=(val)=>{
    const {name,value}=val.target;
    setFormData(prev=>({...prev,[name]:value}));
  }
  const submithandler=async(e)=>{
    e.preventDefault();
      try{
        //const payload = { ...FormData, Contact: Number(FormData.Contact) };
        console.log(FormData);
          const data=await fetch("http://localhost:5000/auth/register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(FormData),
           });
           console.log("Server Response for signup:", data);
          const val=await data.json();
          //console.log("Server Response for signup:", data);
          if(!val.success){
             toast.error(val.message || val.error || "Signup failed");
             return;
          }
          localStorage.setItem('token',val.token);
          localStorage.setItem('user', JSON.stringify(val.user));
          console.log(FormData);
          setIsLoggedIn(true);
          toast.success("Signup Successfully");
          setTimeout(() => {
            Navigate("/");
          }, 800);

    }
      catch(e){
        toast.error("Signup credentials fails");
        return ;
           
      }

  
   
  }
  return (
    <div>
      <div> Welcome to CareerSync Signup page</div>
      <div> Signup Page</div>
      <form onSubmit={submithandler}>
        <div>
          <label htmlFor="Firstname"> First Name<span>*</span></label>
          <input 
          type="text" required
          id="Firstname"
          name="Firstname"
          value={FormData.Firstname}
          placeholder='Enter your first name'
          onChange={Changehandler}/>

        </div>

         <div>
          <label htmlFor="Lastname"> Last Name<span>*</span></label>
          <input 
          type="text" required
          id="Lastname"
          name="Lastname"
          value={FormData.Lastname}
          placeholder='Enter your last name'
          onChange={Changehandler}/>

        </div>

         <div>
          <label htmlFor="email"> Email<span>*</span></label>
          <input 
          type="email" required
          id="email"
          name="email"
          value={FormData.email}
          placeholder='Enter your email'
          onChange={Changehandler}/>

        </div>

          <div>
          <label htmlFor="Contact"> Number<span>*</span></label>
          <input 
          type="tel" required
          id="Contact"
          name="Contact"
          value={FormData.Contact}
          placeholder='Enter your number'
          onChange={Changehandler}/>

        </div>

        <div>
          <label htmlFor="Password"> Password<span>*</span></label>
          <input 
          type={showPassword ? "text" : "password"}
          id="Password"
          name="Password"
          value={FormData.Password}
          placeholder='Enter your password'
          onChange={Changehandler}/>
          <button 
          type="button"
          onClick={()=>setshowPassword(!showPassword)}>
            {showPassword ? <IoIosEyeOff className="h-5 w-5" /> : <IoIosEye className="h-5 w-5" />}
          </button>
        </div>
       
          <div>
          <label htmlFor="ConfirmPassword">Confirm Password<span>*</span></label>
          <input 
          type={showPassword?"text":"password"} required
          id="ConfirmPassword"
          name="ConfirmPassword"
          value={FormData.ConfirmPassword}
          placeholder='Enter your password'
          onChange={Changehandler}/>
          <button 
          type="button"
          onClick={()=>setshowPassword(!showPassword)}>
            {showPassword ? <IoIosEyeOff className="h-5 w-5" /> : <IoIosEye className="h-5 w-5" />}
          </button>
        </div>
        <button 
         type="submit">
          Create Account
         </button>
          <div>
            <p>Already have an account? <span onClick={()=>Navigate("/Login")}>Login</span>
            </p>
          </div>
      </form>
    </div>
  )
}

export default Signup
