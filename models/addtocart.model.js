import mongoose from "mongoose";
const { Schema } = mongoose;

const addtoCartModel = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Object,
        default: null
    },
    userInfo: {
        type: Object,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    payment: {
        type: Object,
        required: true,
    },
    status: {
        type: Number,
        default: 0
    },
    info: {
        type: Object,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    bookingId: {
        type: Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }

})

export default mongoose.model("addtocart", addtoCartModel)