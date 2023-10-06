import mongoose from "mongoose";
import product from "./product.model";
import catogory from "./category.model";

const {Schema} = mongoose

const variantSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:Array,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    productID:{
        type:Schema.Types.ObjectId,
        ref:product,
        required:true
    },
    categoryID:{
        type:Schema.Types.ObjectId,
        ref:catogory,
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("variant",variantSchema);