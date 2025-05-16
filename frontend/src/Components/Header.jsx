import React from "react";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="header bg-amber-300 w-[80vw] mx-auto h-[75vh] bg-[url('/homebg.jpg')] bg-center bg-cover relative  rounded-[12px] ">
      <div className="absolute left-[300px] w-[45vw] mt-[20px]">
        <h2 className="text-white text-[60px] font-bold  mb-[20px] top-[20px]">
          Get Your Favourite Food Here....
        </h2>
        <p className="text-white  font-bold mb-[20px]  bottom-[150px]">
          Explore a world of cuisines — from spicy street eats to gourmet bites.
          Choose from a wide variety of food items curated just for your
          cravings. Order. Enjoy. Repeat.
        </p>
   <button
  onClick={() => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="bg-white text-black px-[15px] py-[5px] rounded-[15px] border-[1px] border-gray-400 cursor-pointer mt-[15px] text-[12px]"
>
  View Menu
</button>

        </div>
      </div>
    </div>
  );
};

export default Header;
