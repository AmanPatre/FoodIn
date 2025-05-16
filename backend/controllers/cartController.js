import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {

    const userData = await userModel.findById(req.userId);
    const {itemId , name, qty , price , image , category  } = req.body;

    let cart = userData.cardData ; 

    const existitem = cart.findIndex((item)=>item.id===itemId);
    if(existitem !==-1){
        cart[existitem].qty  =  cart[existitem].qty + parseInt(qty);
        cart[existitem].price  =  cart[existitem].price + parseInt(price);
    }
    else{

        cart.push({
            id : itemId,
            name : name ,
            price : parseInt(price) , 
            qty : parseInt(qty),
            image : image ,
            category : category,
            
        })
    }


    await userModel.findByIdAndUpdate(req.userId , {cardData : cart});
    res.json({success : true , message : "Added to Cart"})

   
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occurred " });
  }
};

//remove from cart
const removeFromCart = async (req, res) => {
  try {

    const userData = await userModel.findById(req.userId);
    const {itemId} = req.body;

    const cart = userData.cardData;

    const existitem = cart.findIndex((item)=>item.id === itemId);

    if(existitem !==-1){
        cart.splice(existitem  , 1);
    }

    await userModel.findByIdAndUpdate(req.userId , {cardData : cart});
    res.json({success : true , message : "Item Removed"})

    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not Removed From Cart" });
  }
};

//fetch items from cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);
    let cardData = await userData.cardData;

    res.json({ success: true, cardData: cardData });
  } catch (error) {
    res.json({ success: false, message: error });

    console.log(error);
  }
};

export { addToCart, removeFromCart, getCart };
