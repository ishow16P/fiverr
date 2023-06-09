import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export const initDB = async (connStr) => {
  try {
    await mongoose.connect(connStr);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};
