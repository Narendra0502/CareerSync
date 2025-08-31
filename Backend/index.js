const express=require('express');
const cors=require('cors');
require('dotenv').config();
require('./Config/Db');
const AuthRoute=require('./Routes/AuthRoute');
const app=express();



const PORT=process.env.PORT || 4000;
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true,
    methods:['GET','POST','PUT','DELETE','options'],
    allowedHeaders:['Content-Type','Authorization'],
    exposedHeaders: ['set-cookie']
}));
//app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth',AuthRoute);
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));