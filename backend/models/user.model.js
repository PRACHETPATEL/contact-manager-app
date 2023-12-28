const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"Please add the Username"],
        unique:[true,"Username is already taken"]
    },
    fullname:{
        type:String,
        required:[true,"Please add the fullname"]
    },
    email:{
        type:String,
        required:[true,"Please add the email"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type:String,
        required:[true,"Please the add password"]
    }
},{
    timestamps:true
})
const User=mongoose.model("User",userSchema);
module.exports=User;