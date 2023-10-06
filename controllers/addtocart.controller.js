import addtocartModel from "../models/addtocart.model";

export const addtoCart = (req, res) => {
    try {
        const { product, date, userInfo, userId, payment, info, price, bookingId,type,title } = req.body;
        const data = new addtocartModel({
            product: product,
            date: date,
            userInfo: userInfo,
            userId: userId,
            payment: payment,
            price: price,
            info: info,
            bookingId: bookingId,
            type:type,
            title:title
        })
        if (data) {
            data.save()
            res.status(201).json({
                data: data
            })
        }

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const getallcartofuser = async (req, res) => {
    try {
        const { id } = req.params
        const data = await addtocartModel.find({ userId: id })
        if (data) {
            res.status(200).json({
                data: data
            })
        }

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const getsinglecartofuser = async (req, res) => {
    try {
        const { id } = req.params
        const data = await addtocartModel.find({ _id: id })
        if (data) {
            res.status(200).json({
                data: data
            })
        }

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const getallcart = async (req, res) => {
    try {
        const data = await addtocartModel.find()
        if (data) {
            res.status(200).json({
                data: data
            })
        }

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}