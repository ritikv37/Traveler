import mongoose from "mongoose";
import category from "./category.model"

const { Schema } = mongoose;


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    reviews: {
        type: Array,
        default: null
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: category,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    star: {
        type: Number,
        default: null
    }

})

export default mongoose.model("Products", ProductSchema);