import asyncHandler from "express-async-handler";
import SendError from "../utility/Error.handlers.js";
import User from "../models/auth.model.js";
import { generateToken } from "../utility/token.js";
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"

const getAvatarFromName = (name) => {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "U";
  return `https://api.dicebear.com/7.x/initials/svg?seed=${initial}&backgroundColor=D5451B`;
};

const getOrCreateUser = async ({ email, password, name, googleId, avatar }) => {
  let user = await User.findOne({ email });

  if (!user) {
    const newUserData = { email, name };
    if (googleId) newUserData.googleId = googleId;
    if (avatar) {
      newUserData.avatar = avatar;
    } else if (name) {
      newUserData.avatar = getAvatarFromName(name);
    }
    if (password) newUserData.password = password;

    user = await User.create(newUserData);
  }
  return user;
};

const verifyToken = async ({ token }) =>{
  if(!token) throw new SendError(401,"Token required")
  
  const client = new OAuth2Client(process.env.GOOGLE_ID)

  const ticket =  await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID
  })
  
  const payload = ticket.getPayload();

  const avatar = payload.picture.replace(/=s\d+-c$/,"=s300")

  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    avatar: avatar
  };
}

export const googleLogin = asyncHandler(async (req, res) => {
  const idtoken = req.body?.idtoken;

  if (!idtoken) {
    throw new SendError(400,"token required", );
  }

  const { googleId, email, name, avatar } = await verifyToken({ token: idtoken });

  const user = await getOrCreateUser({ email: email, googleId: googleId, name: name, avatar: avatar });

  if (user.googleId !== googleId) {
    throw new SendError("Google credentials do not match", 401);
  }

  const token = generateToken({ id: user._id, email: user.email, name: user.name, avatar: user.avatar });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
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
      token,
    });
});


export const login = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    throw new SendError(401, "Email and password required");
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await getOrCreateUser({ email,password,name })
  }
  
  if (!user.password) {
    throw new SendError(400, "This email is registered via Google. Please login with Google.");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new SendError(401, "Invalid password");
  }

  const token = generateToken({ id: user._id, email: user.email, name: user.name, avatar: user.avatar });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000,
    })
    .json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      }
    });
});


export const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logout successful" });
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new SendError(400, "Email is required to delete the account");
  }

  const deletedUser = await User.findOneAndDelete({ email });

  if (!deletedUser) {
    throw new SendError(404, "User not found or already deleted");
  }

  return res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({
      message: "Account deleted successfully",
    });
});

export const check = asyncHandler(async(req,res)=> {
  const token = req.cookies?.token

  if(!token){
    throw new SendError(404,"tooken required")
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SEC)
     res.status(200).json({
        user: {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          avatar: decoded.avatar
        }
      });
  } catch (error) {
    throw new SendError(404,"Invalid Token send")
  }
})