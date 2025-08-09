import express from "express"
import { router } from "./router/router.js";
import cookieParser from "cookie-parser"
import cors from "cors"
 
export const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())


app.use("/api/v1",router);
