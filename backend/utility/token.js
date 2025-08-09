import JWT from "jsonwebtoken"

export const generateToken = (payload) => {
  return JWT.sign(payload,process.env.JWT_SEC,{
    expiresIn: process.env.JWT_EX
  })
}