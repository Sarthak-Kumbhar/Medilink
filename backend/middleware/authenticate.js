import jwt from "jsonwebtoken"
import SendError from "../utility/Error.handlers";

export const authorize = (req,res,next) => {
  const token = req.cookie?.token;

  if(!token){
    throw new SendError(404,"invalid request toekn not found")
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SEC);
    req.user = decoded
    next()
  } catch (error) {
    throw new SendError(404,"Token is not correct",error)
  }
}