import express from 'express';
import { sendMessage } from './controller/messageController.js';
import messageRouter from './router/messageRouter.js';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
import { dbConnections } from './database/dbConnections.js';
dotenv.config({path:"./config/config.env"});
app.use(cors({
    origin:`${process.env.FRONTEND_URL}`,
    methods:"POST",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/message",messageRouter);
dbConnections();
export default app;