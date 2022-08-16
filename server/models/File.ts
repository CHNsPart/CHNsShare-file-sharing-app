import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema

interface Ifile extends Document{
    filename: string
    secured_url: string
    sizeInBytes: string
    format: string
    sender?: string
    receiver?: string
}

const fileSchema = new Schema<Ifile>({
    filename:{
        type: String,
        require: true
    },
    secured_url:{
        type: String,
        require: true
    },
    format:{
        type: String,
        require: true
    },
    sizeInBytes:{
        type: String,
        require: true
    },
    sender:{
        type: String
    },
    receiver:{
        type: String
    },
}, {
    timestamps: true
})

export default mongoose.model<Ifile>("File", fileSchema)