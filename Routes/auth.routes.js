import {Router} from 'express';
// controllers
import {singIn, singUp, singOut} from "../controllers/auth.controller.js";

const authRouter = Router();

// user sign-up
authRouter.post('/sign-up', singUp);
// user sign-in
authRouter.post('/sign-in', singIn);
// user sign-out
authRouter.post('/sign-out', singOut);

export default authRouter;