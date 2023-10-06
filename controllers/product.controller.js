import { type } from "os";
import productModel from "../models/product.model";
import { multerFunction } from "../utils/multerFunction";
import fs from "fs"
import { ObjectId } from "mongodb";
import mongoose from "mongoose";


export const addProduct = (req, res) => {
    try {

        const uploadFile = multerFunction("./uploads/products").array("image", 10)
        uploadFile(req, res, function (err) {

            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            const { name, description, review, rating, price, location, category } = req.body;
            
            console.log(req.body)
            let imagename = []
            if (req.files != undefined) {
                for (let i = 0; i < req.files.length; i++) {
                    imagename.push(req.files[i].filename)
                }
            }
            const product = new productModel({
                name: name,
                image: imagename,
                description: description,
                review: review,
                rating: rating,
                price: price,
                category: category,
                location: location
            })
            // product.save()
            if (product) {
                res.status(200).json({
                    data: product,
                })
            }

        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const product = await productModel.find({}).populate("category")
        if (product) {
            res.status(200).json({
                data: product,
                path: "http://localhost:8000/uploads/products/"

            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findOne({ _id: id }).populate("category")
        if (product) {
            res.status(200).json({
                data: product,
                path: "http://localhost:8000/uploads/products/"

            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const uploadFile = multerFunction("./uploads/products").array("image", 10)
        uploadFile(req, res, async function (err) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            const { name, description, review, rating, price, location } = req.body;
            const { id } = req.params;
            const product = await productModel.findOne({ _id: id });

            if (product) {
                let imagename = []

                if (req.files != undefined) {
                    for (let i = 0; i < req.files.length; i++) {
                        imagename.push(req.files[i].filename)
                    }
                }

                let image = product.image.concat(imagename)
                
                const newProduct = await productModel.updateOne({ _id: id }, {
                    $set: {
                        name: name,
                        description: description,
                        review: review,
                        rating: rating,
                        price: price,
                        location: location,
                        image: image
                    }
                })
                if (newProduct.acknowledged) {
                    res.status(201).json({
                        data: newProduct,
                        path: "http://localhost:8000/uploads/products/"
                    })
                }
            }

        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const proData = await productModel.find({ _id: id })

        const product = await productModel.deleteOne({ _id: id });

        if (product.deletedCount == 1) {
            if (fs.existsSync('./uploads/products/' + proData.image)) {
                fs.unlinkSync('./uploads/products/' + proData.image)
            }
            return res.status(200).json({
                message: 'Deleted Successfully',
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

export const getAllLocation = async (req, res) => {
    try {
        const location = await productModel.aggregate([
            // Stage 1: Join the category collection with the data collection using the category id
            { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "category" } },
            // Stage 2: Project only the location and category name fields
            { $project: { location: 1, category_name: "$category.name" } },
            // Stage 3: Unwind the categories array
            { $unwind: "$category_name" },
            // Stage 4: Group by location and category_name and calculate the count
            {
                $group: {
                    _id: { location: "$location", category: "$category_name" },
                    count: { $sum: 1 }
                }
            },
            // Stage 5: Group by location and push the categories and counts into an array
            {
                $group: {
                    _id: "$_id.location",
                    categories: {
                        $push: {
                            category: "$_id.category",
                            count: "$count"
                        }
                    }
                }
            },
            // Stage 6: Project the final output
            {
                $project: {
                    location: "$_id",
                    categories: 1,
                    _id: 0
                }
            }
        ])

        if (location) {
            res.status(200).json({
                data: location
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


// [
//     {
//       $facet: {
//         locations: [
//           { $group: { _id: "$location" } },
//           { $group: { _id: null, values: { $push: "$_id" } } },
//           { $project: { _id: 0, locations: "$values" } }
//         ],
//         categoryCounts: [
//           {
//             $group: {
//               _id: "$category",
//               count: { $sum: 1 }
//             }
//           },
//           {
//             $lookup: {
//               from: "categories", 
//               localField: "_id",
//               foreignField: "_id",
//               as: "category_info"
//             }
//           },
//           {
//             $unwind: "$category_info"
//           },
//           {
//             $project: {
//               name: "$category_info.name",
//               count: 1,
//               _id:0
//             }
//           }
//         ]
//       }
//     },
//     {
//       $project: {
//         locations: "$locations.locations",
//         category: "$categoryCounts"
//       }
//     },
//   ]

export const getProductByCat = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await productModel.find({ category: id }).limit(8)
        if (data) {
            res.status(200).json({
                data: data,
                path: "http://localhost:8000/uploads/products/"

            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.messge
        })
    }
}

export const getProductByRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query
        const { id } = req.params
        const min = Number(minPrice)
        const max = Number(maxPrice)
        const idd = String(id)
        console.log(min, max, idd)



        const range = await productModel.aggregate([
            {
                $match: {
                    price: { $gte: min, $lte: max },
                    // category: "64ca3171f4b1674d68e37818"
                },
            },

        ])

        console.log(range)
        if (data) {
            res.status(201).json({
                data: data
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.messge
        })
    }
}

export const paginationProduct = async (req, res) => {
    try {
        const { page } = req.query
        const { id } = req.params
        let size = 8
        const pageno = page - 1;
        const skipno = pageno * size;
        const data = await productModel.find({ category: id }).limit(size).skip(skipno)
        if (data) {
            res.status(200).json({
                data: data,
                path: "http://localhost:8000/uploads/products/"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.messge
        })
    }
}