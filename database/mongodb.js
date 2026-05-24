// database imports :
import {NODE_ENV, DB_URI} from "../config/env.js";
import mongoose from "mongoose";

// check if DB_URI exist :
if (!DB_URI) {
    throw new Error('Missing DB_URI');
}

// connect database :
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI); // connection with mongodb
        console.log(`MongoDB connection in ${NODE_ENV} mode connected`);
    } catch (error) {
        console.error('Database connecting error :' + error);
        process.exit(1);
    }
};

export default connectToDatabase;
