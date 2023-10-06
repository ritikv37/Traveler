import mongoose from "mongoose";

const {Schema} = mongoose;

const userModel = new Schema({
    username: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    role:{
        type: String,
        default:null
    }

})

export default mongoose.model("user",userModel)