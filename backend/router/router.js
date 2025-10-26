import Router from "express"
import { check, deleteAccount, googleLogin, login, logout } from "../controller/user.auth.js"
import { authenticate } from "../middleware/authenticate.js"
import { geminiSearch } from "../controller/user.search.js"

export const router = Router()


// user authentication
router.post("/login",login)
router.post("/login/google",googleLogin)
router.post("/logout", authenticate,logout)
router.post("/delete",authenticate,deleteAccount)
router.get("/presence",check)

router.post("/ai/chat",geminiSearch)
