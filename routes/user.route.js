import express from "express"
import { addUser, getUser, signIn } from "../controllers/user.controller"
import auth from "../middleware/auth.middleware"
const route = express.Router()

route.post("/add-user",addUser)

route.get("/get-user",getUser)

route.post("/sign-in",signIn)
export default route 