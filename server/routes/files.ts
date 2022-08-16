import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary"
import File from "../models/File";

const router = express.Router()
const storage = multer.diskStorage({})

let upload = multer({
    storage,
})

router.get("/upload", upload.single("myFile"), async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json({ message: "No File was selected Maeeeen! 🥲" })
        }
        console.log(req.file)

        let uploadedFile: UploadApiResponse

        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path,{
                folder: "shareCHN",
                resource_type: "auto"
            })
        } catch (error:any) {
            console.log('====================================');
            console.log(error.message);
            console.log('====================================');
            return res.status(400).json({ message: "Cloudinary Error" })
        }

        const {originalname} = req.file
        const {secure_url, bytes, format} = uploadedFile

        const file = await File.create({
            filename:originalname,
            sizeInBytes:bytes,
            secured_url:secure_url,
            format:format
        })
        res.status(200).json(file)

    } catch (error:any) {
        console.log('====================================');
        console.log(error.message);
        console.log('====================================');
        res.status(500).json({ message: "Server Error 😔" })
    }
})

export default router