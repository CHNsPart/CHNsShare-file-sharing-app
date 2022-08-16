import express  from "express";
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db";
import fileRoute from "./routes/files"
import { v2 as cloudinary } from "cloudinary"

/* Environment Section */
const app = express()
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLUDINARY_API_CLOUD,
    api_key: process.env.CLUDINARY_API_KEY,
    api_secret: process.env.CLUDINARY_API_SECRET,
    secure:true
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use("/api/files", fileRoute)


/* Database Connection */
connectDB()

/* Variables */
const PORT = process.env.PORT

/* App Listening Port */
app.listen(PORT, 
    () => console.log(`Server is listening on ${PORT}`)
)