import React, {  useState } from 'react'
import { assets } from '../assests/assets'
import { Link } from 'react-router-dom';
import { useCart  } from '../Context/StoreContext';
import { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";



const Navbar = ({setshowLogin}) => {
  
const navigate = useNavigate();
const location = useLocation();

const [under , setunder ] = useState("home");
 const state = useCart();
 const {token , setToken} = useContext(StoreContext);

 const removetoken=()=>{

  localStorage.removeItem("token");
  setToken("")
  toast.success("Logged Out")
 }

  return (
    <div className="parent w-full">
    <div className='flex   top-0 justify-around max-w-[100vw] min-h-[10vh] items-center mx-auto '  >
      <div className="logo">
        <img src={assets.logo} alt="" style={{height : "20px" , width:"80px"}}/>
      </div>
      <div className="nav_mid ">
        <ul className = 'flex gap-[40px] justify-center items-center cursor-pointer '>
          <Link to="/"><li className={under==="home" ? "active" : ""} onClick={()=>setunder("home")}>home</li></Link>
<li
  className={under === "menu" ? "active" : ""}
  onClick={() => {
    setunder("menu");
    if (location.pathname === "/") {
      const menuSection = document.getElementById("menu");
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/?scrollToMenu=true");
    }
  }}
>
  menu
</li>


          <li className={under==="mobile-app" ? "active" : "" } onClick={()=>setunder("mobile-app")}>mobile-app</li>
          <li
  className={under === "contact" ? "active" : ""}
  onClick={() => {
    setunder("contact");
    if (location.pathname === "/") {
      const footerSection = document.getElementById("contact");
      if (footerSection) {
        footerSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/?scrollToFooter=true");
    }
  }}
>
  contact us
</li>

        </ul>
      </div>
      <div className="nav_end">
        <ul className ="flex gap-[40px] justify-center items-center ">
         
         <div className='relative'> <li className='relative'><Link to="/cart"><img src={assets.basket_icon}/></Link></li>
         {state.length!==0 ? ( <div className='dot absolute w-[10px] h-[10px] bg-red-600 border-[0] rounded-[10px] right-[-10px] top-[0px]'></div>) : (<></>)}</div>
         {!token?(<li className='cart '><button onClick={()=>setshowLogin(true)} className=' border-[1px] text-sm rounded-[20px] px-[20px] py-[10px] border-orange-500'>Sign In </button> </li>) : (
        <div className='profile relative'>
          <img src={assets.profile_icon} alt="" />
          <ul className='prof_drop absolute hidden z-1 right-[-40px]  w-[10vw] flex flex-col justify-center items-center'>
            <Link to='/myorders'><li> <img src={assets.bag_icon} alt="" /><p>Orders</p></li></Link>
           
            <li onClick={()=>removetoken()} ><img src={assets.logout_icon}alt="" /><p>Logout</p></li>



          </ul>
        </div>)}
          
        </ul>
      </div>
    </div>
    </div>
  )
}

export default Navbar
