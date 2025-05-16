import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config

const app = express();
const port = process.env.PORT || 4000;

// middlewares

app.use(express.json());
app.use(cors());
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// db connection

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World ...");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
