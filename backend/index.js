import { connectDB } from "./db/db.js";
import { app } from "./app.js"
import dotenv from "dotenv"

dotenv.config({
  path: "./.env",
  debug: true,
  encoding: "UTF-8"
})


connectDB()
.then(() => {
  app.listen(process.env.PORT,process.env.HOST,() =>{
    console.log(`⚙ Server running on http://${process.env.HOST}:${process.env.PORT}`)
  })
})
.catch((error) => {
  console.log(`error while running application !!`,error)
})