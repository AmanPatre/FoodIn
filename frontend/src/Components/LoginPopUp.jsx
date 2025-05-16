import React, { useState } from "react";
import { assets } from "./../assests/assets";
import axios from 'axios';
import { StoreContext } from "../Context/StoreContext";
import { useContext } from "react";

import { toast } from 'react-toastify';



const LoginPopUp = ({ setshowLogin }) => {
const [currState, setcurrState] = useState("Login");

const {setToken , token } = useContext(StoreContext)


  const [data , setData] = useState({
    name : "", 
    password : "",
    email : ""
  })

  const dataChange = (e)=>{

    setData({...data , [e.target.name] : e.target.value})

  }
  const handleSubmit= async(e)=>{

    e.preventDefault();

   // http://localhost:4000/api/user/loginuser -- LOGIN API 
   //http://localhost:4000/api/user/signupuser== Sign up API 

   if(currState === "Login"){
    try{

   const res = await axios.post("http://localhost:4000/api/user/loginuser" , data );

   if(res.data.success){
    toast.success(res.data.message);
    setToken(res.data.token);
    localStorage.setItem("token" , res.data.token);
    setshowLogin(false);
  


   }
   else{
     toast.error(res.data.message);
   }
  }
  catch(error){
    console.log(error)
  }

   }

   else if(currState === "Sign Up" ){
      try{

   const res = await axios.post("http://localhost:4000/api/user/signupuser" , data );

   if(res.data.success){
    toast.success(res.data.message);
    setToken(res.data.token);
    localStorage.setItem("token" , res.data.token);
    setshowLogin(false);
   }
   else{
     toast.error(res.data.message);
   }
  }
  catch(error){
    console.log(error)
  }

   }

  }

  return (
    <div className="login absolute z-[1] w-[100%] h-[100%] grid bg-[#00000090]">
      <form action="" onSubmit={handleSubmit} className="place-self-center w-[23vw] flex flex-col gap-[25px] py-[25px] px-[30px] rounded-[8px] text-[14px] bg-white">
        <div className="title flex justify-between font-semibold text-center">
          <h2>{currState}</h2>
          <img
            onClick={() => setshowLogin(false)}
            src={assets.cross_icon}
            alt=""
            className="w-[16px] cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-[20px] ">
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" name ="name" onChange={(e)=>dataChange(e)} placeholder="name" className="border border-[#c9c9c9] rounded p-[5px] " />
          )}

          <input type="text" name = "email" onChange={(e)=>dataChange(e)}  placeholder="Email" className="border border-[#c9c9c9] rounded p-[5px]" />
          <input type="text"name = "password"  onChange={(e)=>dataChange(e)}  placeholder="Password" className="border rounded border-[#c9c9c9] p-[5px]" />
        </div>

        <div className="flex justify-center ">
          <button type="submit" className="bg-orange-500 text-white w-full p-[5px] rounded cursor-pointer ">
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>
        </div>
        <div className="flex justify-between gap-[10px]">
          <input type="checkbox" required />
          <p className="text-[10px]">By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p className="text-center">
            Create account ? <span  className ='text-orange-500 cursor-pointer font-semibold'onClick={()=>setcurrState("Sign Up")} >Click Here</span>
          </p>
        ) : (
          <p className="text-center" >
            Already have an Account <span  className ='text-orange-500 cursor-pointer font-semibold' onClick={()=>setcurrState("Login")} >Login </span>
          </p>
        )}
      </form>

   
    </div>
  );
};

export default LoginPopUp;
