import React, { useEffect, useState } from 'react'


import { useCart , useDispatchCart } from '../Context/StoreContext'
import { StoreContext } from "../Context/StoreContext";
import { useContext } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import { toast } from 'react-toastify';

const Order = () => {
  
    let {Subtotal} = useContext(StoreContext)
    let {Total} = useContext(StoreContext)
    const state = useCart();
    const dispatch = useDispatchCart();
    const Navigate = useNavigate();

    Subtotal = state.reduce((total, item) => total + item.price, 0);
    Total = Subtotal+30;

    const token = localStorage.getItem("token");

    const [details , setDetails] = useState({
      firstName : "",
      lastName : "",
      email : "",
      street : "",
      city : "",
      state : "",
      zipcode : "",
      country : "",
      phone : ""

    }) 

    const handleChange =(e)=>{

      setDetails({...details , [e.target.name] : e.target.value})

    }

    const placeorder=async(e)=>{
      e.preventDefault();

      const items = state;
      const amount = Total;
      const address = details;


      let res = await axios.post('http://localhost:4000/api/order/placeorder' , {items :items, amount :amount , address :  address  } , {headers:{token : token}});
      if(res.data.success){
        const{session_url}= res.data;
        toast.success(res.data.message);
        window.location.replace(session_url);
      }
      else{
        toast.error(res.data.message)
      }


    }

    const navigate = useNavigate();

    useEffect(()=>{

      if(!token){
        navigate('/cart')

      }
      else if (Total===0){
        navigate('/cart')
      }

    },[token])



  return (
    <div>
      
        <div className="cart w-[80vw] mx-auto min-h-[80vh]">

          <div className="cart flex">

                <div className="cart_left w-2/3 px-[20px]">

                <h1 className='font-semibold text-[25px] mb-[50px]'>Delivery Information </h1>
              <form onSubmit={(e)=>placeorder(e)} action="place-order" className='w-[40vw] h-[40vh] flex flex-col gap-4'>


  <div className="flex gap-4">
    <input className='border rounded-[5px] w-1/2 p-2' onChange={(e)=>handleChange(e)} name = "firstName" type="text" placeholder='First Name' />
    <input className='border rounded-[5px]  w-1/2 p-2' onChange={(e)=>handleChange(e)} name = "lastName" type="text" placeholder='Last Name' />
  </div>


  <input className='border rounded-[5px]  w-full p-2'onChange={(e)=>handleChange(e)} name = "email" type="text" placeholder='Email Address' />


  <input className='border rounded-[5px]   w-full p-2' onChange={(e)=>handleChange(e)} name = "street"  type="text" placeholder='Street' />


  <div className="flex gap-4">
    <input className='border rounded-[5px]  w-1/2 p-2' onChange={(e)=>handleChange(e)}  name ="city" type="text" placeholder='City' />
    <input className='border  rounded-[5px]  w-1/2 p-2' onChange={(e)=>handleChange(e)} name ="state" type="text" placeholder='State' />
  </div>

  
  <div className="flex gap-4">
    <input className='border rounded-[5px]  w-1/2 p-2' onChange={(e)=>handleChange(e)} name ="zipcode"  type="text" placeholder='Zip Code' />
    <input className='border rounded-[5px]  w-1/2 p-2' onChange={(e)=>handleChange(e)} name ="country" type="text" placeholder='Country' />
  </div>


  <input className='border rounded-[5px]  w-full p-2' onChange={(e)=>handleChange(e)} name ="phone"  type="text" placeholder='Phone' />
  <div ><button type='submit'  className="checkout w-full bg-orange-500 text-white px-[15px] py-[5px] rounded-[5px] text-[14px] cursor-pointer" >Place Order</button></div>
</form>
 
            </div>

            <div className="cart_right w-1/3  border-l border-[#e2e2e2] ">
            <div className='mx-[20px] mt-[30px] '>

              <h2 className='font-bold'>Cart Total</h2>

              <div className='flex flex-col gap-[7px] mt-[20px] text-[14px] text-[#676767] '>

              <div className="card_total flex justify-between">
              <p>Subtotal </p>
              <p>{Subtotal}₹</p>
              </div>

              <hr className='border border-[#e2e2e2]' />

            <div className="fee flex justify-between">
              <p>Delivery Fee </p>
              <p>30₹</p>
            </div>

              <hr className='border border-[#e2e2e2]' />
              <div className="total flex justify-between">
              <p className='text-black font-semibold'>Total  </p>
              <p className='text-black font-semibold'>{Total}₹</p>
              </div>
</div>


            </div>

            </div>
            
        </div>


            
        </div>

      


      
    </div>
  )
}

export default Order
