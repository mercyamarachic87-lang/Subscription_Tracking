import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from "./config/env.js";

console.log(DB_URI)

if(!DB_URI) {
    throw new Error('please define the DB_URI environment variable inside <.env/production>.local')
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`connected to database in ${NODE_ENV} node`);

    } catch (error) {
        console.error('Error connecting to database:', error);

        process.exit(1);
    }
}

export default connectToDatabase;