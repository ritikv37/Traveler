import categoryModel from "../models/category.model";

export const AddCategory = (req,res)=>{
    try {
        const {name} = req.body;
        // console.log(name)
        const newCategory = new categoryModel({
            name:name
        })
        // newCategory.save();
        if(newCategory){
            res.status(201).send({
                data:newCategory
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message 
        })
    }
}
  
export const GetCategory = async (req,res)=>{
try {
    const category = await categoryModel.find()
    if(category){
        res.status(200).send({
            data:category
        })
    }
} catch (error) {
    res.status(500).send({
        message: error.message 
    })
}
}
export const GetCategoryname = async (req,res)=>{
    try {
        const category = await categoryModel.find({name})
        if(category){
            res.status(200).send({
                data:category
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message 
        })
    }
    }