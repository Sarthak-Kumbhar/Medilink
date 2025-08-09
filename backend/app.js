import express from "express"
import { router } from "./router/router.js";
import cookieParser from "cookie-parser"

export const app = express()

app.use(cookieParser())
app.use(express.json())


app.use("/api/v1",router);
