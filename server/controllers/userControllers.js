const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { generateToken } = require('../utils/generateToken')

const signupUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body

   const userExists = await User.findOne({ email })

   if (userExists) {
      res.status(400).json({ failure: true, message: 'User already exists' })
      throw new Error('User already exists')
   }

   const newUser = await User.create({
      name,
      email,
      password,
   })
   if (newUser) {
      res.status(201).json({
         _id: newUser._id,
         name: newUser.name,
         email: newUser.email,
         settings: newUser.settings,
         activeMatches: newUser.activeMatches,
         isAdmin: newUser.isAdmin,
         token: generateToken(newUser._id),
      })
   } else {
      res.status(400).json({ failure: true, message: 'Could not create a user!' })
      throw new Error('Could not create a user!')
   }
})

const signinUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body

   const foundUser = await User.findOne({ email })

   if (foundUser && (await foundUser.matchPassword(password))) {
      res.status(200).json({
         _id: foundUser._id,
         name: foundUser.name,
         email: foundUser.email,
         settings: foundUser.settings,
         activeMatches: foundUser.activeMatches,
         isAdmin: foundUser.isAdmin,
         token: generateToken(foundUser._id),
      })
   } else {
      res.status(400).json({ failure: true, message: 'Invalid email or password!' })
      throw new Error('Invalid email or password!')
   }
})

const updateUser = asyncHandler(async (req, res) => {
   const userId = req.user._id
   const user = await User.findById(userId)

   if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.settings = req.body.settings || user.settings
      user.activeMatches = req.body.activeMatches || user.activeMatches
      if (req.body.password) user.password = req.body.password

      const updatedUser = await user.save()

      res.status(200).json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         settings: updatedUser.settings,
         activeMatches: updatedUser.activeMatches,
         isAdmin: updatedUser.isAdmin,
         token: generateToken(updatedUser._id),
      })
   } else {
      res.status(403).json({ failure: true, message: 'User Not Found' })
      throw new Error('User Not Found')
   }
})

module.exports = { signinUser, signupUser, updateUser }
