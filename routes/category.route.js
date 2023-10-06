import express from "express";
import { AddCategory, GetCategory, GetCategoryname } from "../controllers/category.controller";

const route = express.Router();

route.post("/add-category", AddCategory)
route.get("/get-category", GetCategory)
route.get("/get-category-name", GetCategoryname)


export default route;