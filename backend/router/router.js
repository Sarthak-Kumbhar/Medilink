import Router from "express"
import { googleLogin, googleSignup, login, signup } from "../controller/user.auth.js"

export const router = Router()


// user authentication
router.post("/login",login)
router.post("/signup",signup)
router.post("/login/google",googleLogin)
router.post("/signup/google",googleSignup)


