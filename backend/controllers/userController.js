const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require("dotenv").config();
//@desc Register new user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password } = req.body
  if (!username || !fullname || !email || !password) {
    res.status(400)
    throw new Error('All the fields are mandatory!')
  }
  const userEmailAvailable = await User.findOne({ email })
  const userUsernameAvailable = await User.findOne({ username })
  if (userEmailAvailable) {
    res.status(400)
    throw new Error('Email ALready exists!')
  }
  if (userUsernameAvailable) {
    res.status(400)
    throw new Error('Username ALready exists!')
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    username,
    fullname,
    email,
    password: hashedPassword
  })
  if (user) {
    res
      .status(201)
      .json({message: 'User Registered Successfully!!',user:{ _id: user.id, username: user.username, email: user.email }})
  } else {
    res.status(400)
    throw new Error('User Data is not Valid')
  }
})
//@desc login  user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const user = await User.findOne({email:email})
  // console.log(user);
  if (user!=null && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
      user: {
        id:user.id
      },
    },process.env.ACCESS_TOKEN_SECERT,{expiresIn:"10m"});
    res.status(200).json({message: 'User Authenticated!!',token:accessToken});
  }else{
    res.status(401);
    throw new Error("Email or Password is invalid");
  }
})
//@desc current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({message:"Details Of Curren User",user:req.user})
})
module.exports = { loginUser, registerUser, currentUser }
