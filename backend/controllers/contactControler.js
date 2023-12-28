const asyncHandler = require('express-async-handler')
let Contact = require('../models/contact.model')
//@desc get all contacts
//@route GET /api/contact/
//@access private

const getContacts = asyncHandler(async (req, res) => {
//   res.send("Get All Contacts");
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json({message:"Contact Fetched SuccessFully",contacts:contacts})
})
//@desc get a contact by id
//@route GET /api/contact/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
    const isValid =require('mongoose').Types.ObjectId.isValid(req.params.id);
    let contact=false;
    if(isValid){
      contact=await Contact.findById(req.params.id);
    }
    
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!!");
    }
    if(contact.user_id.toString()!==req.user.id){
      res.status(403);
      throw new Error("User dont have permission to update, delete or fetch another user contact");
    }
    res.status(200).json({message:"Contact Fetched SuccessFully",contact:contact})
})
//@desc add new contact
//@route POST /api/contact/
//@access private

const addContact = asyncHandler(async (req, res) => {
  const { name, email, contact } = req.body
  if (!name || !email || !contact) {
    res.status(400)
    throw new Error('All fields are mandatory!')
  }
  const status = await Contact.create({ name, email, contact,user_id:req.user.id })
  res.status(201).json({message:"Contact Added SuccessFully",contact:contact})
})
//@desc delete contact by id
//@route DELETE /api/contact/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const isValid =require('mongoose').Types.ObjectId.isValid(req.params.id);
  let contact=false;
  if(isValid){
    contact=await Contact.findById(req.params.id);
  }
  if(!contact){
      res.status(404);
      throw new Error("Contact Not Found!!");
  }
  if(contact.user_id.toString()!==req.user.id){
    res.status(403);
    throw new Error("User dont have permission to update another user contact");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({message:"this contact has been deleted","contact":contact})
})
//@desc update contact by id
//@route PUT /api/contact/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const isValid =require('mongoose').Types.ObjectId.isValid(req.params.id);
  let contact=false;
  if(isValid){
    contact=await Contact.findById(req.params.id);
  }
  if(!contact){
      res.status(404);
      throw new Error("Contact Not Found!!");
  }
  if(contact.user_id.toString()!==req.user.id){
    res.status(403);
    throw new Error("User dont have permission to update or fetch another user contact");
  }
  const updateContact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
  res
    .status(200)
    .json({message:"contact updated successfully!!",previouscontact:contact,updateContact:updateContact})
})
module.exports = {
  getContacts,
  addContact,
  deleteContact,
  updateContact,
  getContact
}
