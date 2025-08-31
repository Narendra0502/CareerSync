const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');
const express=require('express');
const mongoose=require('mongoose');
const User=require('../Models/User');
const {signupvalidation,loginvalidation}=require('../Middlewares/Validation');
const JWT_SECRET_KEY = 'CareerSync'; 

const Signup=async(req,res)=>{
    try{
        console.log("Signup controller inside bhai");
        const {Firstname,Lastname,Contact,email,Password}=req.body;
        console.log(req.body);
        if(!Firstname || !Lastname || !Contact || !email || !Password){
            console.log("All fields are required");
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            console.log("User already exists");
            return res.status(400).json({success:false, message:"User already exists"});
        }
        const hashedpassword=await bcrypt.hash(Password,10);
        const user=new User({
            Firstname,
            Lastname,
            Contact,
            email,
            Password:hashedpassword,    
        });
        await user.save();
        const token=jwt.sign({userId:user._id,Email:user.email},
            process.env.JWT_SECRET || "CareerSync",
            {expiresIn:"7d"}

        );
        res.status(201).json({success:true, message:"User created successfully", token});

    }
    catch(error){
        console.error("Error during signup:",error);
        res.status(500).json({success:false,message:"Signup controller se arahu bhai"});
    }
        
    
};
const Login =async(req,res)=>{
    try{
        const {email,Password}=req.body;
        if(!email || !Password){
            console.log("All fields are required");
            return res.status(400).json({success:false, message:"All fields are required"});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"User does not exist"});
        }
        const isequal=await bcrypt.compare(Password,user.Password);
       if(!isequal){
        return res.status(400).json({success:false, message:"Invalid credentials"});
       }
       const token=jwt.sign({userId:user._id,email:user.email},
        process.env.JWT_SECRET || "CareerSync",
        {expiresIn:"7d"}
       );
       res.status(200).json({success:true, message:"User logged in successfully", token});
    }
    catch(error){
        console.error("Error during login:",error);
        res.status(500).json({success:false,message:"Login controller se arahu bhai"});
    }
}
module.exports={Signup,Login};