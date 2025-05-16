import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();

    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log("error : ", error);
    res.json({ success: false, message: "Error" });
  }
};

//list food

const listfood = async (req,res) => {
  try {
    const food_items = await foodModel.find({});
    res.json({ success: true, data: food_items });
  } catch (error) {
    res.json({ success: false, message: "error" });
    console.log("error : ", error);
  }
};

// remove food 

const removefood =async(req, res)=>{

    try {

       const item = await foodModel.findById((req.body.id));
       fs.unlink(`uploads/${item.image}`,()=>{})

       await foodModel.findByIdAndDelete(req.body.id);

        res.json({success : true , message : "Deleted"})

    }
    catch(error){
        res.json({success : false , "error" : error})
        console.log("Error" , error)
    }

}

export { addFood, listfood , removefood };
