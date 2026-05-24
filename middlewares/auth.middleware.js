import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {JWT_SECRET} from "../config/env.js";

// authorization middleware
const authorize = async (req, res, next) => {
    try {
        let token;
        // auth token check :
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(' ')[1];
        }

        // token check :
        if (!token) return res.status(401).json({ success: false ,message: "Unauthorized"});
        // jwt token verification
        const decoded = jwt.verify(token, JWT_SECRET);

        // user check :
        const user = await User.findById(decoded.userId).select('-password');
        // check if the user exist
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        // response
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false ,message: "Unauthorized", error: error.message });
    }
}

export default authorize;