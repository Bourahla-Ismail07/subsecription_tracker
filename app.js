// express import :
import express from 'express';
// import routes :
import authRouter from './Routes/auth.routes.js'; // authentification
import userRouter from './Routes/user.routes.js'; // users
import subscriptionRouter from './Routes/subscriptions.routes.js'; // subscriptions
import workflowRouter from './Routes/workflow.routes.js'; // workflows

// port :
import {PORT} from './config/env.js';

// express app :
const app = express();

// health route :
app.get("/", (req, res) => {
    res.send("server is running");
});

// routes :
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);
app.use('/api/v1/workflows',workflowRouter);

// server run :
app.listen(PORT,async () => {
    console.log(`Server started on port ${PORT}`);
    await connectToDatabase();
    console.log(`url : http://localhost:${PORT}`);
})

// module export :
export default app;

