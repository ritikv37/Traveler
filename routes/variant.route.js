import express from 'express';
import { addVariant, deleteVarinat, getSingleVariant, getVariant, updateVariant } from '../controllers/variant.controller';
const route = express.Router()

route.post("/add-variant",addVariant)
route.get("/get-variant",getVariant)
route.delete("/delete-variant/:id",deleteVarinat)
route.put("/update-variant/:id",updateVariant)
route.get("/get-single-variant/:id",getSingleVariant)

export default route