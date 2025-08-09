import asyncHandler from "express-async-handler"
import SendError from "../utility/Error.handlers.js"
import User from "../models/auth.model.js"
import { generateToken } from "../utility/token.js"

export const googleSignup = asyncHandler(async (req, res) => {
  const { email, googleId, name, avatar } = req.body

  if (!email || !googleId) {
    throw new SendError("Google account data incomplete", 400)
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new SendError( 409, "User already exists with this email")
  }

  const user = await User.create({ email, googleId, name, avatar })



  res.status(201).json({
    message: "Google signup successful",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    },
    token: generateToken(user._id),
  })
})

export const googleLogin = asyncHandler(async (req, res) => {
  const { email, googleId } = req.body

  if (!email || !googleId) {
    throw new SendError("Google account data incomplete", 400)
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new SendError("No Google account found, please sign up first", 404)
  }

  if (user.googleId !== googleId) {
    throw new SendError("Google credentials do not match", 401)
  }

  const token = generateToken({ id: user._id, email: user.email });

  res
  .status(200)
  .cookie("token", token, {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 60 * 60 * 1000,
  })
  .json({
    message: "Google login successful",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    },
    token: generateToken(user._id),
  })
})

export const signup = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password) {
    throw new SendError("Email and password required", 400)
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new SendError("User already exists", 409)
  }

  const user = await User.create({ email, password, name })

  res.status(201).json({
    message: "Signup successful",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    token: generateToken(user._id),
  })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new SendError(401,"Credentials required")
  }

  const user = await User.findOne({ email })
  if (!user || !user.password) {
    throw new SendError(401,"Invalid credentials")
  }

  await user.comparePassword(password)

  const token = generateToken({
    id: user._id,
    email: user.email
  })

  res
  .status(200)
  .cookie("token",token,{
    httpOnly: process.env.NODE_ENV === "production",
    secure:  process.env.NODE_ENV === "production",
    maxAge: 2 * 60 * 60 * 1000
  })
  .json({
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    token: generateToken(user._id),
  })
})