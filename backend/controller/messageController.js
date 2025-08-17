import {Message} from "../models/messageSchema.js";
export const sendMessage=async(req,res)=>{
    try{
const {name,email,subject,address,message,budget,location}=req.body;
if(!name || !email || !subject || !message||!address){
return res.status(400).json({
success:false,
message:"All fields are required"
});
}
await Message.create({name,email,subject,address,message,budget,location});
res.status(200).json({
success:true,
message:"Message sent successfully"
});
}catch(error){
    if (error.name === "ValidationError") {
        let errorMessage = "";
        if (error.errors.name) {
          errorMessage += error.errors.name.message + " ";
        }
        if (error.errors.email) {
          errorMessage += error.errors.email.message + " ";
        }
        if (error.errors.subject) {
          errorMessage += error.errors.subject.message + " ";
        }
        if (error.errors.address) {
          errorMessage += error.errors.address.message + " ";
        }
        if (error.errors.message) {
          errorMessage += error.errors.message.message + " ";
        }
        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }
  
      console.log(error);
    }
};



