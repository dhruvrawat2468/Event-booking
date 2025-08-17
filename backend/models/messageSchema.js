import mongoose from "mongoose";
import validator from "validator";// database format
const messageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minLength:[3,"Name should be at least 3 characters long"]

    },
    email:{
        type:String,
        required:[true,"email is required"],
        validate:[validator.isEmail,"Please provide a valid email address"]

    },
    subject:{
        type:String,
        required:[true,"subject is required"],
        minLength:[5,"subject should be at least 5 characters long"]

    },
    address:{
        type:String,
        required:[true,"address is required"],
        minLength:[5,"address should be at least 5 characters long"]
    },
    message:{
        type:String,
        required:[true,"Name is required"],
        minLength:[10,"message should be at least 10 characters long"]

    },
    budget:{
        type:String,
    },
    location:{
        type:String,
    },


});
export const Message=mongoose.model("Message",messageSchema);