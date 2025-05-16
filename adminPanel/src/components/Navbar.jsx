import React from 'react'
import { assets } from '../assets/assets.js'



const Navbar = () => {
  return (
    <div className='nav w-[100vw]   '>
        <div className="  h-[12vh]  nav_nav flex justify-between text-center items-center w-[90vw] mx-auto" >


        <div className="logo">
            <div className='w-[100px]'><img src={assets.logo} alt="" /></div>
            <div><p className='text-[12px]'>Admin Panel</p></div>
        </div>
        <div className="profile">
            <img src={assets.profile_image} alt="" />
        </div>

       
        </div>
      
    </div>
  )
}

export default Navbar
