import React from 'react'
import axios from "axios"
import { useState , useEffect } from 'react'
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';


const Orders = () => {


  const [orders , setOrders] = useState([]);
 




  const fetchAdmnOrders =async()=>{
    try{
    const res = await axios.post('https://foodin-backend2.onrender.com/api/order/adminorders');
    if(res.data.success){

      console.log(res.data.orders);
      setOrders(res.data.orders)
    }
    }
    catch(error){
      console.log(error)
    }

  }
  const handleStatus =async(e,id)=>{
  

  const res = await axios.post('https://foodin-backend2.onrender.com/api/order/status' , {orderId : id , status : e.target.value});
  if(res.data.success){
    toast.success(res.data.message);
    fetchAdmnOrders();
  }
  else{
     toast.error(res.data.message)
  }


}

  useEffect(() => {
fetchAdmnOrders();
  }, [])
  
  return (
    <div className='page w-[100vw]'>
      <div className="adminOrders w-[80vw]  mx-auto min-h-[70vh] mt-[20px]">
        <div className=" ">
          {orders.map((item)=>(
            <div key ={item._id} className=' one_order border m-[10px] grid grid-cols-5 gap-[20px] text-[14px] p-[10px] ' >
              <div className="parcel_image w-[50px]"><img src={assets.parcel_icon} alt="" /></div>

<div className="food_address flex flex-col gap-[20px] ">
              <div className="food">
                {item.items.map((food)=>(

                  <span className="foodname font-semibold">
                  <span> {food.name} </span>
                  <span>X</span>
                  <span> {food.qty}</span></span>
                ))}
              </div>
              <div className='Addres_details'>
             <span> {item.address.firstName}</span>
              <span> {item.address.lastName}</span>
                <div>{item.address.phone}</div>
                <div>{item.address.street}</div>
                <div> {item.address.state}</div>
                  <div>{item.address.zipcode}</div>

                </div></div>
               
                <div className="items_count">{item.items.length}</div>
                 <div className='amount'>{item.amount}₹</div>
                <div className="select">
                  <select value={item.status} onChange={(e)=>handleStatus(e,item._id)} id="" className='bg-orange-500 font-semibold text-white px-[15px] py-[5px] rounded-[5px] cursor-pointer'>
                    <option value='Food Processing'>Food Processing</option>
                     <option value='Out For Delivery'>Out For Delivery</option>
                    <option value = 'Delivered'>Delivered</option>
                  </select>
                </div>

                  
            </div>

            
           
          ))}

       
        </div>
      </div>
  
     
    </div>
  )
}

export default Orders
