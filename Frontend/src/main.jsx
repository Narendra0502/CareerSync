import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";       
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";  
createRoot(document.getElementById('root')).render(
  <>
  <BrowserRouter>
  <Toaster position="top-right" reverseOrder={true} />
   <App />
  </BrowserRouter>
  </>
    
  
)
