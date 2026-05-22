import {Router} from 'express';
// controllers :
import {singIn, singUp, singOut} from "../controllers/auth.controller.js";

const authRouter = Router();

// path : api/v1/auth/singUp (POST)
authRouter.post('/sign-up', singUp);
// path : api/v1/auth/singIn (POST)
authRouter.post('/sign-in', singIn);
// path : api/v1/auth/singOut (POST)
authRouter.post('/sign-out', singOut);

export default authRouter;