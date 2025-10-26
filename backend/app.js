import express from "express"
import { router } from "./router/router.js";
import cookieParser from "cookie-parser"
import cors from "cors"
 
export const app = express()

const list = ["http://localhost:5173", process.env.CLIENT_URL]
app.use(cors({
  origin: function(origin, callback){
    if(list.indexOf(origin) !== -1 || !origin){
      callback (null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())


app.use("/api/v1",router);
