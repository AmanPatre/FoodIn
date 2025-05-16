import express from 'express';
const orderRouter = express.Router();
import { placeorder, verifyOrder } from '../controllers/orderController.js';
import authmiddleware from '../middleware/auth.js';
import { userOrders } from '../controllers/orderController.js';
import { adminOrders } from '../controllers/orderController.js';
import { updateStatus } from '../controllers/orderController.js';


orderRouter.post('/placeorder' , authmiddleware, placeorder);
orderRouter.post('/verify'  , verifyOrder);
orderRouter.post('/userorders' , authmiddleware,  userOrders)
orderRouter.post('/adminorders' ,  adminOrders),
orderRouter.post('/status' ,  updateStatus)



export default orderRouter