const express=require('express');
const {Signup,Login}=require("../Controllers/AuthController");
const {signupvalidation,Loginvalidation}=require("../Middlewares/Validation");
const router=express.Router();

router.post("/register",signupvalidation,Signup);
router.post("/Login",Loginvalidation,Login);
module.exports=router;