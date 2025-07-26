import mongoose from "mongoose";

const connectDb=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.mongoUrl);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log(`Error connection to mongoDb ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;