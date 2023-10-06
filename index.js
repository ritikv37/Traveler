import express from 'express';
import bodyParser from "body-parser"
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cors from 'cors';

import categoryRoute from "./routes/category.route"
import productRoute from "./routes/product.route"
import variantRoute from "./routes/variant.route"
import userRoute from "./routes/user.route"
import addtoCartRoute from "./routes/addToCart.route"

const app = express();
const PORT = 8000
dotenv.config()


// ---------middleware-----
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname))



var corsOptions = {
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// -------routes-------------
app.use("/variant",variantRoute)
app.use("/category", categoryRoute)
app.use("/product", productRoute)
app.use("/user",userRoute)
app.use("/addtocart",addtoCartRoute)

// ---------------------mongodb connect--------------------

async function main() {
    const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@traveler.lu09ipq.mongodb.net/?retryWrites=true&w=majority`;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to MongoDB!")
    }).catch(() => {
        console.log("Could not connect to MongoDB!")
    })
}
main()
