import express from 'express';
import dotenv from 'dotenv';
import connectDb from './connect.js';
import groupRoutes from './routes/groupRoutes.js';
import cors from 'cors'

dotenv.config();

const app=express();
const port=process.env.port;


connectDb();
app.use(cors())
app.use(express.json())
app.use('/api',groupRoutes)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});