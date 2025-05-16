import axios from 'axios';
import React from 'react'
import { useState , useEffect } from 'react'
import { toast } from 'react-toastify';

const List = () => {

    const [list , setList] = useState([]);

    const fetchlist = async()=>{


        try{
        const res = await axios.post('http://localhost:4000/api/food/list')
        setList(res.data.data)
        }
        catch(error){
            console.log("Error" , error)
        }

    }

   

    const removefood = async(id)=>{
        try{

        const res = await axios.post("http://localhost:4000/api/food/remove" , {id})
        if(res.data.success){
            await fetchlist();
           toast.success("Item Deleted")
        }
        else{
            toast.error("Item Not  Deleted")
        }


        
        }
        catch(error){
            console.log("Error" , error)
        }

    }
    

     useEffect(() => {
        fetchlist();
     
    }, [])
  return (
    <div className='w-[100vw]'>

       <div className='w-[75vw] mx-auto mt-[40px] text-[14px] '>


        <div className="h2 font-semibold">All food List</div>

        <div className="border border-[#c7c7c7]">
        <div className="list_heads grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] p-[10px] font-semibold">
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Action</p>
        </div>
        <hr className='mb-[10px] border-[#c7c7c7]'/>

        <div className="food_items ">
            {list.map((item)=>(
            <div>
                <div  key = {item.id} className="food_item grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] p-[10px]">
                    <img className='w-[50px]' src={"http://localhost:4000/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}₹</p>
                  
                    <p className='cursor-pointer' onClick={()=>removefood(item._id)}>X</p>
                </div>

                <hr className='border-[#c7c7c7]'/>
               
                </div>
            )
            )}
          

        </div>
        

</div>
</div>


    
    
    </div>
  )
}

export default List
