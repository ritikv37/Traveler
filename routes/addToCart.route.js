import express from "express"
import { addtoCart, getallcart, getallcartofuser, getsinglecartofuser } from "../controllers/addtocart.controller"
import auth from "../middleware/auth.middleware"
const route = express.Router()

route.post("/add-to-cart",auth, addtoCart)
route.get("/get-cart", getallcart)
route.get("/get-cart-user/:id", getallcartofuser)
route.get("/get-single-cart-user/:id", getsinglecartofuser)

export default route