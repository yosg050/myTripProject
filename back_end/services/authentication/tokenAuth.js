import jwt from "jsonwebtoken";
import getUser from "../../db/services/users/getUser.js";

const tokenAuth = async (req, res, next) => {
    console.log("Cookies received:", req.cookies);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await getUser(verified.uid);
        req.userId = user._id;
        next();
        
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
}

export default tokenAuth;
