import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

const userRouter = express.Router();

// login route
userRouter.post("/loginuser" , loginUser);
//signup route
userRouter.post("/signupuser" , signupUser);


export default userRouter