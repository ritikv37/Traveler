import fs from 'fs';
import { multerFunction } from "../utils/multerFunction";
import variantModel from "../models/variant.model";
import productModel from "../models/product.model";

export const addVariant = (req, res) => {
    try {
        const upload = multerFunction("./uploads/variant").array("image", 10)
        upload(req, res, async function (err) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
            const { name, description, price, location, size, productID } = req.body
            // console.log(req.files)
            const proID = await productModel.findOne({ _id: productID })
            if (proID) {
                let imagename = []
                if (req.files !== undefined) {
                    for (let i = 0; i < req.files.length; i++) {
                        imagename.push(req.files[i].filename)
                    }
                }
                const variant = new variantModel({
                    name: name,
                    description: description,
                    price: price,
                    location: location,
                    size: size,
                    productID: productID,
                    categoryID: proID.category,
                    image: imagename
                })
                variant.save()
                res.status(201).json({
                    data: variant,
                    message: "Variant added successfully"
                })
            }


        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getVariant = async (req, res) => {
    try {
        const variant = await variantModel.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "productID",
                    foreignField: "_id",
                    as: "productID"
                }
            },
            {
                $unwind: {
                    path: "$productID",
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryID",
                    foreignField: "_id",
                    as: "categoryID"
                }
            },
            {
                $unwind: {
                    path: "$categoryID",
                }
            }
        ])
        if (variant) {
            res.status(200).json({
                data: variant,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteVarinat = async (req, res) => {
    try {
        const {id} = req.params
        const variant = await variantModel.findOne({_id:id})
        
       for(let i = 0; i < variant.image.length;i++){
        if(fs.existsSync("./uploads/variant/"+variant.image[i])){
            fs.unlinkSync("./uploads/variant/"+variant.image[i])
        }
       }

       const delVariant = await variantModel.deleteOne({_id:id})

       if(delVariant.acknowledged){
        return res.status(201).json({
            message:"delete successfully"
        })
       }

       
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateVariant = async (req, res) => {
    try {
        const upload = multerFunction("./uploads/variant").array("image",10)
        upload(req, res, async function (err) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
            const { name, description, price, location, size, productID } = req.body
            const {id} = req.params;
            const variant = await variantModel.findOne({_id:id})
            if (variant) {
                let imagename = []
                if (req.files!== undefined) {
                    for (let i = 0; i < req.files.length; i++) {
                        imagename.push(req.files[i].filename)
                    }
                }
                const image = variant.image.concat(imagename)
                const updatesize = variant.size.concat(size)
                const updateVariant = await variantModel.updateOne({_id:id},
                    {
                        $set:{
                            name:name,
                            description:description,
                            price:price,
                            location:location,
                            size:updatesize,
                            productID:productID,
                            image:image
        
                        }
                    })

                if(updateVariant.acknowledged){
                    return res.status(201).json({
                        data:updateVariant,
                        message:"update successfully"
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getSingleVariant = async (req, res)=>{
    try {
        const {id} = req.params
        const variant = await variantModel.findOne({_id:id}).populate("productID").populate("categoryID")
    
        if(variant){
            res.status(200).json({
                data:variant
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
