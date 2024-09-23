 import mongoose from "mongoose";
 import dotenv from "dotenv";

 dotenv.config();

 const MONGO_URI = process.env.MONGO_URI;

 export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI,{
            dbName: "React-ChatRealTime"
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}
