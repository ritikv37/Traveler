import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            console.log(token)
            const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
            if (decoded) {
                next();
            } else {
                return res.status(402).json({
                    error: "Invalid token"
                })
            }
        } else {
            return res.status(401).json({
                error: "No token provided"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
export default auth