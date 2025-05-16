import React, { useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from './../assests/assets';

const Myorders = () => {

  const token = localStorage.getItem('token');
  const [data , setData] = useState([])
  const [orders , setOrders] = useState([]);
  

  const fetchMyOrders=async()=>{

    const res = await axios.post('https://foodin-backend2.onrender.com/api/order/userorders' , {} , {headers:{token : token}})
    if(res.data.success){
    
       setData(res.data.data);
     
      const tempdata = res.data.data;
       console.log(tempdata)

      const items =tempdata.map((item)=>(item.items))

       console.log(items)
       setOrders(items)
      
    }



  }


  useEffect(() => {
   fetchMyOrders();

  }, [])
  
  return (
    
    <div>

   <div className="page max-w-[100vw]">
  <div className="orders  min-h-[40vh] w-[80vw] mx-auto mt-[20px]">
    <div className="header font-semibold">My Orders</div>

    {data.map((order, index) => (
      <div key={index} className="order grid grid-cols-6  justify-between items-center border mb-[20px] p-[30px] text-[12px] ">
        <div className="image w-[45px]"><img src={assets.parcel_icon} alt="" /></div>
        
<div className="order ">
        {order.items.map((item, idx) => (
        
          <span key={idx} className="">
            
            <span>{item.name}</span>
            <span>x</span>
            <span> {item.qty}</span>
            
          </span>
        ))}
        </div>

        <div className=" pl-4 ">
      {order.amount}₹
        </div>
        <div>Items: {order.items.length}</div>
        <div className="food_processing font-semibold flex justify-center items-center text-center gap-[3px]"><span className='dot inline-block w-[6px] h-[6px] bg-red-600 border-[0] rounded-[10px] '></span><span>{order.status}</span></div>
        <div><button type="button" class="btn border cursor-pointer w-[150px] bg-orange-500 text-white font-semibold py-[5px] rounded-[5px] " onClick={fetchMyOrders}>Track Order</button></div>
      </div>
    ))}
  </div>
</div>


     
       
      
    </div>
  )
}

export default Myorders
