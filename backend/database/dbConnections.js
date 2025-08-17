import mongoose from "mongoose";
export const dbConnections = ()=>{
    mongoose.connect(process.env.MONGO_URI,{dbName:"MERN_STACK_EVENT_MESSAGE"}).then(()=>{
        console.log("Database connection successful");
    }).catch((err)=>{
        console.log("Database connection failed");
    });
    
}