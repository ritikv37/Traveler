import userModel from "../models/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const addUser = async (req, res) => {
    try {
        const { username, name, password, email, role } = req.body
        const existsUser = await userModel.find(
            {
                $or: [
                    { username: username },
                    { email: email }
                ]
            }
        )
        const newpassword = bcrypt.hashSync(password, 10);
        if (existsUser != "") {
            res.status(400).json({
                message: "User already exists"
            })
        }
        if (existsUser == "") {
            const newUser = new userModel({
                username: username,
                name: name,
                password: newpassword,
                email: email,
                role: role
            })
            newUser.save()
            res.status(200).json({
                message: "User added successfully"
            })
        }


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await userModel.find()
        res.status(200).json({
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const signIn = async (req, res) => {
    try {
        const { username, password, email } = req.body
        const user = await userModel.findOne({
            $or: [
                { email: email },
                { username: username },
            ]
        })
        if (user === null) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        const token = jwt.sign({ id: user.email }, process.env.SECRET_TOKEN_KEY)
        if (validPassword) {
            return res.status(200).json({
                message: "Login successful",
                user: user,
                token: token
            })
        } else {
            return res.status(400).json({
                message: "Invalid email/username or password"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}