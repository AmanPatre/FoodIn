import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setimage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: " ",
  });
  const handlesetData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    try {
      const res = await axios.post(
        "https://foodin-backend2.onrender.com/api/food/add",
        formData
      );

      if (res.data.success) {
        toast.success("Item Added Successfully...");

        setData({
          name: "",
          description: "",
          price: "",
          category: " ",
        });
      } else {
        toast.error("There was Some Problem");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div className="w-[100vw]">
      <form
        className=" w-[40%] mt-[40px] ml-[50px] flex flex-col gap-[20px] "
        onSubmit={handleSubmit}
        action=""
      >
        <div className="addimage flex flex-col  gap-[10px] ">
          <p>Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-[100px] h-[70px]"
            />
          </label>
          <input
            onChange={(e) => setimage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
            className="border p-[5px] rounded-[5px] "
          />
        </div>

        <div className="flex flex-col  gap-[10px]">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            onChange={(e) => handlesetData(e)}
            placeholder="Type Here"
            className="border p-[5px] rounded-[5px]  "
          />
        </div>
        <div className="add_desc flex flex-col  gap-[10px]">
          <p>Product Description</p>
          <textarea
            onChange={(e) => handlesetData(e)}
            className="border p-[5px] rounded-[5px]  "
            name="description"
            rows="3"
            placeholder="Write Here"
            required
          ></textarea>
        </div>

        <div className="add_price_cat flex  gap-[20px] ">
          <div className="price">
            <p>Product Category</p>
            <select
              name="category"
              onChange={(e) => handlesetData(e)}
              className="border p-[5px] rounded-[5px] "
            >
              <option value=" ">Select Category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add_price flex flex-col   ">
            <p>Product Price</p>
            <input
              onChange={(e) => handlesetData(e)}
              className="border p-[5px] rounded-[5px]  "
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button
          className="border rounded-[5px]  cursor-pointer w-[100px] bg-black text-white py-[5px]"
          type="Submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
