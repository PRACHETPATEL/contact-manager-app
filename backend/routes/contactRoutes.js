const express=require("express");
const router=express.Router();
const {getContacts,deleteContact,updateContact,addContact,getContact}=require("../controllers/contactControler");
const validateToken = require("../middleware/validateTokenHandler");

// router.get("/",(req,res)=>{//router.route("/").get((req,res)=>{}) is same 
//     getContacts(req,res);
// });
// router.get("/:id",(req,res)=>{//router.route("/").get((req,res)=>{}) is same 
//     getContact(req,res);
// });
// router.post("/",(req,res)=>{
//     addContact(req,res);
// });
// router.delete("/:id",(req,res)=>{
//    deleteContact(req,res);
// });
// router.put("/:id",(req,res)=>{
//    updateContact(req,res);
// });

// or 
router.use(validateToken);
router.route("/").get(getContacts).post(addContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
module.exports=router;