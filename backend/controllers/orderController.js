import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing the order
const placeorder =async( req , res )=>{

    const frontend_url = "http://localhost:5173";

try{

    const newOrder = new orderModel({
        userId : req.userId,
        items : req.body.items,
        amount : req.body.amount,
        address : req.body.address
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId,{cardData : []})
  
    const line_items = req.body.items.map((item) => (
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name
            },
            unit_amount: Math.round((item.price / item.qty) * 100)

          },
          quantity: item.qty
        }
      ));
      


    line_items.push({
        price_data : {
            currency : "inr",
            product_data :{
                name : "Delivery Charges"
            },

            unit_amount : 30*100

        },
        quantity : 1
    })

    const session = await stripe.checkout.sessions.create({

        line_items : line_items,
        mode : "payment",
        success_url : `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url : `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })

    res.json({success:true  , session_url  : session.url})

}

catch(error){
    console.log(error)
    res.json({success : false , message : "Error"})
}
}

const verifyOrder = async(req, res)=>{

    const {orderId , success} = req.body;
    try{

        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId , {payment : true })
            res.json({success:true , message : "Paid"})
        }

        else{
            await orderModel.findByIdAndDelete(orderId);
          
            res.json({success : false , message : "Not Paid"})
        }

    }
    catch(error){

        console.log(error)
        res.json({success : false , message : "error" })


    }
}


// USER  orders for frontend 


const userOrders=async(req,res)=>{

    try{
        const orders = await orderModel.find({userId:req.userId});
        res.json({success : true  , data : orders })

    }
    catch(error){
        console.log(error)
        res.json({success : false , message : "Error"})
    }
    
}

// get all the orders to the admin panele
const adminOrders=async(req,res)=>{
    try{

        const orders = await orderModel.find({});
        res.json({success : true , message : "Orders Fetched" , orders :orders})

    }
    catch(error){
        console.log(error)
        res.json({success:false , message : error})
    }

}

//updating order status 

const updateStatus =async(req, res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId , {status : req.body.status})
        res.json({success : true , message : "Status Updated"})

    }
    catch(error){
          res.json({success : false , message : "Status Not Updated"})

    }

}



export {placeorder , verifyOrder , userOrders , adminOrders , updateStatus}