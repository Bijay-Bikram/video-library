import UserModal from "../models/UserModal.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js"
import jwt from "jsonwebtoken";

// Signup auth
export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = await UserModal.create({ ...req.body, password: hash }); // create a new user & hash the password
        res.status(200).send("New user has been created successfully");
    } catch (error) {
        next(error);
    }
}

// Signin auth
export const signin = async (req, res, next) => {
    try {
        const user = await UserModal.findOne({ name: req.body.name });// Verify and return user details
        if (!user) return next(createError(404, "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong Credentials")); // Verify if the password is correct using bcrypt (bcrypt verify hashed password ) 

        const token = jwt.sign({ id: user._id }, process.env.JWT); // create a token
        const { password, ...others } = user._doc; // seperate password from the user

        res.cookie("access_token", token, { // send the token to the user, "access_token" is name of the cookie
            expires: new Date(Date.now() + 9000000000),
            httpOnly: true,
        }).status(200).json(others);

    } catch (error) {
        next(error);
    }
}

//Note: When user login successfully, cookie will be send to the user in the response with the token.

