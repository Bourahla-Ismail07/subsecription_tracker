import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// User model :
import User from '../models/user.model.js';
// JWT :
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

// sign-up controller
export const singUp = async (req, res, next) => {
    // init the mongoDB session
    const session = await mongoose.startSession();
    session.startTransaction(); // start the session

    try {
        const {name, email, password} = req.body;
        // check if the user exist :
        const existingUser = await User.findOne({email});
        // throw the error :
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // password hash :
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create new user :
        const newUsers = await User.create([{name, email, password: hashedPassword}], {session});
        // user token :
        const token = jwt.sign(
            {userId: newUsers[0]._id},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN}
        );
        // save the transaction and end the session
        await session.commitTransaction();
        session.endSession(); // end the session
        // sign-up response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token: token,
                user: newUsers[0]
            }
        });
    } catch (error) {
        // abort the session in case of the user exist or error
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
// sign-in controller
export const singIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        // check if the user exist
        if (!user) {
            const error = new Error('User does not exist');
            error.statusCode = 404;
            throw error;
        }
        // password check
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // check if the password is valid
        if (!isPasswordValid) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        // JWT token generate
        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        // the response
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user
            }
        });
    } catch (error) {
        next(error);
    }
}
// sign-out controller
export const singOut = async (req, res, next) => {
    try {
        res.status(200).json({success: true});
        // sign out logic
    } catch (error) {
        next(error);
    }
}