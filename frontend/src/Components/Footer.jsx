import React from 'react'
import { assets } from '../assests/assets'

const Footer = () => {
  return (
   <div id='contact' className=" bottom-0 w-full bg-gray-800 text-white min-h-[40vh] pt-[30px]   ">
    <div className='w-[80%] mx-auto flex justify-center gap-[100px] mt-[50px]' >

    <div className="left w-2/3">
        <div><img src={assets.logo} alt="" className='w-[120px] h-[30px]'/></div>
        <div><p className='text-[14px] mt-[30px] mb-[20px]'>Your one-stop destination for satisfying cravings. From street-style snacks to gourmet delights, we deliver joy in every bite.
Fresh ingredients, fast delivery, and flavors that feel like home — because every meal deserves to be memorable.</p></div>
        
        <div className='flex gap-[20px]'>
        <img className='w-[40px] h-[40px]' src={assets.facebook_icon} alt="" />
        <img className='w-[40px] h-[40px]'src={assets.twitter_icon} alt="" />
        <img className='w-[40px] h-[40px]' src={assets.linkedin_icon} alt="" /></div>
    </div>

    <div className=" flex flex-col mid w-1/3 mx-auto ">
        <h2 className='text-[20px] font-semibold mb-[28px]'>COMPANY</h2>
        <ul className='text-[14px]  '>
            <li>Home</li>
             <li>About Us</li>
              <li>Delivery</li>
               <li>Privacy Policy</li>
        </ul>
    </div>

    <div className="right w-1/3 mx-auto  flex flex-col">
        <h2 className='text-[20px] font-semibold mb-[28px]'>GET IN TOUCH</h2>
        <div className='text-[14px]'>
        <p>+1-212-456-7890</p>
        <p>contact@foodin.com</p>
        </div>
    </div>
</div>
<hr className='border w-[80%] mx-auto mt-[50px] mb-[50px]'/>
<div><p className='text-center pb-[10px] text-[10px]'>Copyright &copy; 2025 FoodIn.com - All Rights reserved</p></div>
</div>

  )
}

export default Footer
