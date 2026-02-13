import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, { dbName: "LMS" })
      .then(() => {
        console.log("Connected to database successfully");
      })
      .catch((err) => {
        console.log("Failed to connect with database", err);
      });
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};

export default connectDB;
