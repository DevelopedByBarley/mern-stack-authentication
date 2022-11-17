const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

//  @desc Register user
//  @route Post /api/users/register
//  @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exist
  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('User alredy exist')
  }

  // Hash password

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.send(400);
    throw new Error('Invalid user data')
  }
})

//  @desc Login user
//  @route Post /api/users/login
//  @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email
  })


  // !!!!!

  if (user && await bcrypt.compare(password, user.password)) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.send(400);
    throw new Error('Invalid credentials')
  }

})

// Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}


//  @desc Register user
//  @route Post /api/users
//  @access Private

const getMe = asyncHandler(async (req, res) => {
  const {_id, name, email} = await User.findById(req.user.id)
  
  res.status(200).json({ 
    id: _id,
    name,
    email
  })
})




module.exports = {
  registerUser,
  loginUser,
  getMe
}