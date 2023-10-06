import mongoose from "mongoose";

const {Schema} = mongoose

const CategoryModel = new Schema({
    name:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
})

export default mongoose.model("Category", CategoryModel)  