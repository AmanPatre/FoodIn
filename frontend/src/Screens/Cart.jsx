import React from 'react'
import { useCart , useDispatchCart } from '../Context/StoreContext'
import { StoreContext } from "../Context/StoreContext";
import { useContext } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Cart = () => {
  
    let {Subtotal} = useContext(StoreContext)
    let {Total} = useContext(StoreContext)
    const state = useCart();
    const dispatch = useDispatchCart();
    const Navigate = useNavigate();
    const token = localStorage.getItem("token")

    Subtotal = state.reduce((total, item) => total + item.price, 0);
    Total = Subtotal+30;

    const fetchdata = async()=>{

      try{

        const res = await axios.post('http://localhost:4000/api/cart/getcart', {}, {
          headers: { token }
        });

      if( res.data.success){
        const cartItems =res.data.cardData;
        dispatch({type : "CLEAR"})
        cartItems.forEach((item)=>{

          dispatch({

        type:"ADD",
        id : item.id,
        name : item.name,
        price : item.price * item.qty ,
        qty : item.qty,
        image : item.image,
        org_price : item.price

          } )


        })
      }

    

    }
    catch(error){
      console.log(error)
    }




    }



    const handleRemove = async (id) => {
      try {
        const res = await axios.post(
          'http://localhost:4000/api/cart/removefromcart',
          { itemId: id },
          { headers: { token } }
        );
    
        if (res.data.success) {
          dispatch({ type: "DELETE", id });
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while removing the item.");
      }
    };


    useEffect(() => {
      fetchdata();
    }, [token])
    
    

  return (
    <div>
      
        <div className="cart w-[80vw] min-h-[70vh] mx-auto">

            {state.length===0 ? (<div className='min-h-[50vh] w-[80vw] flex justify-center items-center mt-[50px] ' >No items in your cart</div>) : (<div className="cart flex">

                <div className="cart_left w-2/3 px-[20px]">

                <div className='heaeders grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] text-[14px] mb-[20px] text-[#676767] '>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
               <hr className='border border-[#e2e2e2]' />

            {state.map((item )=>(
                <div>
                <div className='grid  grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] my-[20px] text-[14px] ' key={item.id}>
                    <div><img src={item.image} alt="" className='w-[50px]'/></div>
                    <div>{item.name}</div>
                    <div>{item.org_price}₹</div>
                    <div>{item.qty}</div>
                    <div>{item.price}₹</div>
                     
                   
                    <div className='cursor-pointer px-[5px]' onClick={()=>handleRemove(item.id)}>X</div>
                    
                     </div>
                     <hr className='border border-[#e2e2e2]' />
                     </div>
                   
            ))}
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

<div ><button onClick={()=>Navigate("/order")} className="checkout mt-[20px] bg-orange-500 text-white px-[15px] py-[5px] rounded-[5px] text-[14px] cursor-pointer" >Checkout</button></div>
            </div>

            </div>
            
        </div>)}


            
        </div>
      
    </div>
  )
}

export default Cart
