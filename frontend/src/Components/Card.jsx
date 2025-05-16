import React, { useState , useEffect} from 'react'
import { assets } from '../assests/assets'
import { useCart , useDispatchCart } from '../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Card = ({id , name , price , image , description , category}) => {
  const state = useCart();
  const dispatch  = useDispatchCart();
  const [itemCount , setItemCount] = useState(1);
  const finalprice = itemCount * price;

  const addToCart=async()=>{

    const exitItem = state.find((item)=>item.id===id)

    const token = localStorage.getItem("token")
    if(exitItem){

      await dispatch({
        type : "UPDATE",
        id : id,
        qty : itemCount,
        price:finalprice,
         org_price : price,
      })
    }

    else{
      await dispatch({
        type : "ADD",
        id : id ,
        qty : itemCount,
        name : name,
        price : finalprice,
        image : image , 
        org_price : price,
  
      })

 
    }

    const res = await axios.post('https://foodin-backend2.onrender.com/api/cart/addtocart' , {itemId:id , name : name , price : price , qty : itemCount , image , category : category  }, { headers : {token : token }});
    if(res.data.success){
      toast.success(res.data.message)
    }

    else{
       toast.error(res.data.message)
    }

  }
   

  return (
 
      <div className="food_item  rounded-3xl ">


        <div className="img relative">

          <img src={image} alt="" className='w-full rounded-t-3xl '/>
          {
            itemCount===1?<img className="w-[35px] absolute bottom-[8px] right-[5px] cursor-pointer"src={assets.add_icon_white} onClick={()=>setItemCount(prev=>prev+1)}/>:
            <div className='absolute bottom-[8px] right-[5px] flex items-center gap-[10px] rounded-[15px] p-[3px]  bg-white '>
              <img className = ' w-[30px]'src={assets.remove_icon_red} alt="" onClick={()=>setItemCount(prev=>prev-1)}/>
            <p>{itemCount}</p>
            <img className =' w-[30px]' src={assets.add_icon_green} alt=""onClick={()=>setItemCount(prev=>prev+1)} /></div>
          }
          </div>

        <div className="food_item_info flex justify-around  items-center mt-[30px] mb-[30px] ">
          <div className="rating"><p>{name}</p></div>
         <div className=''><img className=""src={assets.rating_starts} style={{width : "60px" , height:"15px"} } alt="" /></div> 
        </div>
        <div className="food_desc text-[12px] text-[#747474] mb-[20px] mx-[10px] ">{description}</div>
        <div className='flex justify-around'>
        <div className="price text-orange-500 mb-[20px] mx-[10px]">{finalprice}₹</div>
        <div className="add_to_cart"><button className='bg-orange-500 text-white px-[10px] py-[5px] rounded-[5px] text-[10px] cursor-pointer' onClick={addToCart}>  Add </button></div>
        </div>

    
      </div>
      
   
  )
}

export default Card
