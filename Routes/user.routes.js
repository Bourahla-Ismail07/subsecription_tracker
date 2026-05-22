import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../controllers/user.controller.js";

const userRouter = Router();

// get all users :
userRouter.get('/', getUsers);

// get user by id :
userRouter.get('/:id', authorize, getUser);

// create and add new user :
userRouter.post('/', createUser);

// update user :
userRouter.put('/:id', updateUser);

// delete user :
userRouter.delete('/:id', deleteUser);

export default userRouter; 