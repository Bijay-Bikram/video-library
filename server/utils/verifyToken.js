import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You are not authenticated")); // Verify if the token exists

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid"));
        // console.log(req.user); // "req.user" is undefined
        // console.log(user);
        req.user = user;  // user is an object that include user id
        next();
    });
}

// Note: user object is added to "req.user" to verify the user is authenticated