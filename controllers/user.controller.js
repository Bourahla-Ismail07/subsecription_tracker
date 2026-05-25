import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// get all users in DB
export const getUsers = async (req, res, next) => {
    try {
        // find all users :
        const users = await User.find();
        // the response :
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};
// get user by id
export const getUser = async (req, res, next) => {
    try {
        // get the user id from the request url
        const id = req.params.id;
        // fetch the user by id (all infos without the password)
        const user = await User.findById(id).select('-password');
        // check if the user exist
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        // GET response
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};
// create user
export const createUser = async (req, res, next) => {
    try {
        // get the user infos from the request url
        const {name, email, password} = req.body;
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // fetch user using email
        const existingUser = await User.findOne({email});
        // check if the user already exit
        if (existingUser) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        // create new user
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        })
        // user response
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

        // POST response
        res.status(201).json({ success: true, data: userResponse });
    } catch (error) {
        next(error);
    }
};
// update user
export const updateUser = async (req, res, next) => {
    try {
        // get the user new infos and the user id from the request url
        const {name, email, password} = req.body;
        const id = req.params.id;
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // find the user andf update his infos
        const user = await User.findByIdAndUpdate(id, {
                name,
                email,
                hashedPassword,
            },
            {
                new: true,
                runValidators: true
            }
        );
        // check if the user exit
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        // the PUT response
        res.status(204).json({ success: true });
    } catch (error) {
        next(error);
    }
};
// delete user
export const deleteUser = async (req, res, next) => {
    try {
        // get the user id from the request url
        const id = req.params.id;
        // find the user by id and delete it
        const user = await User.findByIdAndDelete(id);
        // check if the user exist
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        // DELETE response
        res.status(204).json({ success: true });
    } catch (error) {
        next(error);
    }
};