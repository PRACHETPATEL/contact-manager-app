const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const validateToken=asyncHandler(async (req,res,next)=>{
    let token;
    let authheader=req.headers.authorization||req.headers.Authorization;
    if(authheader && authheader.startsWith("Bearer")){
        console.log("Access Token Being Verified...");
        token=authheader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECERT ,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized")
            }
            req.user=decoded.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing in request");
        }
    }
});
module.exports=validateToken;