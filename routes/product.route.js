import express from "express";
import { addProduct, deleteProduct, getAllLocation, getAllProducts, getProductByCat, getProductByRange, getSingleProduct, paginationProduct, updateProduct } from "../controllers/product.controller";

const route = express.Router()

route.post("/add-product", addProduct)
route.get("/get-all-product", getAllProducts)
route.put("/update-product/:id", updateProduct)
route.delete("/delete-product/:id", deleteProduct)
route.get("/get-single-product/:id", getSingleProduct)

route.get("/get-all-location", getAllLocation)
route.get("/get-category-by-id/:id", getProductByCat)
route.get("/get-category-by-range/:id", getProductByRange)
route.get("/products/:id", paginationProduct)

export default route