import React, { useContext } from "react";
import { menu_list } from "../assests/assets";
import { StoreContext } from "../Context/StoreContext";
import Card from "./Card";

const Menu = ({category , setCategory}) => {


  const {foodlist} = useContext(StoreContext)

  const handleClick =(item)=>{
    setCategory(prev=>prev===item.menu_name ? "All" : item.menu_name)
  }
  return (
    <div>
      <div id ='menu'className="menu_content w-[80vw] mx-auto mt-[50px] min-h-[100vh] mb-[60px]">
        <div className="header text-black text-[25px] font-bold mb-[30px]">
          Explore Our Menu{" "}
        </div>

        <p className="text-[12px] text-[#747474]">
          Craving something crispy, spicy, sweet, or savory? Our menu brings
          together a rich variety of dishes — from street food favorites to
          chef-crafted specials. Whether you're in the mood for a quick bite or
          a full feast, we’ve got you covered. Every item is prepared fresh,
          with quality ingredients and love in every layer. Scroll down, take
          your pick, and let the feast begin!
        </p>

        <div className="menu_items flex gap-[40px] overflow-x-auto whitespace-nowrap text-center px-[20px] mt-[40px] cursor-pointer hide-scrollbar">
        {menu_list.map((item , index )=>(

            <div key={index} className="flex-shrink-0 text-center" onClick={()=>handleClick(item)}>
                <img src={item.menu_image} alt="" className={category===item.menu_name ? "active2" : ""} />
                <p className="text-[13px] mt-[10px] text-[#747474] ]">{item.menu_name}</p>
            </div>
        ))}
      </div>
   
      <hr className="mt-[40px] border-t-2 border-[#e2e2e2]" />

      <div className="menu_items text-[19px] font-semibold mt-[20px] mb-[20px]">Food Items near you </div>
      <div className="foodlist grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-[30px] gap-y-[50px]">

       
  
        {foodlist.map((item, index) => (
          category === "All" || item.category === category ? (
            <Card key={index} id={item._id} name={item.name} image={ "https://foodin-backend2.onrender.com/images/"+item.image} price={item.price} description={item.description} category={item.category} />
          ) : null
        ))}
      </div>




      </div>

   
    </div>
  );
};

export default Menu;
