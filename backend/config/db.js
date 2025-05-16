import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://amanpatre25:aman00725@cluster0.xfmdcls.mongodb.net/FoodIn2"
    )
    .then(() => console.log("DB Connected."));
};
