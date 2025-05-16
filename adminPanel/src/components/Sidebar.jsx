import { assets } from "../assets/assets"
import { Link } from "react-router-dom"
import { useState } from "react"

const Sidebar = () => {
    const [option , setOption] = useState("")
  return (
    <div className="w-[15%] h-[87vh] border-r ">
        <div className="sidebar_options pt-[50px] flex flex-col pl-[20%] gap-[20px] ">

             <Link to='/add'><div onClick={()=>setOption("Add")} className={option==="Add" ? " active sidebar_option flex items-center gap-[15px] border border-r-0 px-[10px] py-[8px] rounded-tl-[3px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[3px] cursor-pointer" : "sidebar_option flex items-center gap-[15px] border border-r-0 px-[10px] py-[8px] rounded-tl-[3px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[3px] cursor-pointer"}>
              <img src={assets.add_icon} alt="" />  
                <p>Add Items</p>
             
            </div> </Link> 
            <Link to='/list'><div onClick={()=>setOption("List")} className={option==="List" ? " active sidebar_option flex items-center gap-[15px] border border-r-0 px-[10px] py-[8px] rounded-tl-[3px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[3px] cursor-pointer" : "sidebar_option flex items-center gap-[15px] border border-r-0 px-[10px] py-[8px] rounded-tl-[3px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[3px] cursor-pointer"}>
                <img src={assets.order_icon} alt="" />
                <p>List Items </p>
               
            </div></Link>
             <Link to ='/orders'><div onClick={()=>setOption("Orders")} className={option==="Orders" ? " active sidebar_option flex items-center gap-[15px] border border-r-0 px-[10px] py-[8px] rounded-tl-[3px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[3px] cursor-pointer" : "sidebar_option flex items-center gap-[15px] border border-r-0 px-[10px] py-[8px] rounded-tl-[3px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[3px] cursor-pointer"}>
               <img src={assets.order_icon} alt="" />
                <p>Orders</p>
                
            </div></Link>

           





        </div>
        
      
    </div>
  )
}

export default Sidebar
