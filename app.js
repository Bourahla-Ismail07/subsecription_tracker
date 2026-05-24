// express import :
import express from 'express';
import cookieParser from 'cookie-parser';

// import routes :
import authRouter from './Routes/auth.routes.js'; // authentification
import userRouter from './Routes/user.routes.js'; // users
import subscriptionRouter from './Routes/subscriptions.routes.js'; // subscriptions
import workflowRouter from './Routes/workflow.routes.js'; // workflows

//middlewares :
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

// port :
import {PORT} from './config/env.js';

// express app :
const app = express();

// middlewares use :
app.use(express.json()); // for json data
app.use(express.urlencoded({ extended: false })); // for HTML forms data
app.use(cookieParser()); // read cookies from requests and store users data
app.use(arcjetMiddleware);

// health route :
app.get("/", (req, res) => {
    res.send("server is running");
});

// routes :
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);
app.use('/api/v1/workflows',workflowRouter);

// error middleware :
app.use(errorMiddleware);

// server run :
app.listen(PORT,async () => {
    console.log(`Server started on port ${PORT}`);
    await connectToDatabase();
    console.log(`url : http://localhost:${PORT}`);
})

// module export :
export default app;

