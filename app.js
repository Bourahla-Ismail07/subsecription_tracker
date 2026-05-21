// express import :
import express from 'express';

// port :
import {PORT} from './config/env.js';

// express app :
const app = express();

// health route :
app.get("/", (req, res) => {
    res.send("server is running");
});
// server run :
app.listen(PORT,async () => {
    console.log(`Server started on port ${PORT}`);
    await connectToDatabase();
    console.log(`url : http://localhost:${PORT}`);
})

// module export :
export default app;

