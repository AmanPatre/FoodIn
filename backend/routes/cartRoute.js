import express from "express";

import { addToCart, removeFromCart , getCart } from "../controllers/cartController.js";
import authmiddleware from "../middleware/auth.js";

const cartRouter = express.Router();


cartRouter.post('/addtocart' , authmiddleware,  addToCart)
cartRouter.post('/removefromcart' , authmiddleware , removeFromCart)
cartRouter.post('/getcart' , authmiddleware ,  getCart)



export default cartRouter;