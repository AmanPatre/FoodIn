import axios from 'axios';
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const Verify = () => {

    const [searchParams , setsearchParams] = useSearchParams()
    const success  = searchParams.get("success");
    const orderId  = searchParams.get("orderId");
    console.log(success , orderId );
    const navigate =  useNavigate();

    const verifyPayment =async()=>{
        const res = await axios.post('https://foodin-backend2.onrender.com/api/order/verify' , {success : success ,  orderId : orderId});
        if(res.data.success){
            navigate("/myorders")
        }
        else{
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment()
     
    }, [])
    
    

  return (
    <div className='verify min-h-[60vh] grid'>
        <div className='spinner' ></div>

       
      
    </div>
  )
}

export default Verify
