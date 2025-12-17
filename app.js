import express from 'express';
import { PORT } from './config/env.js';
import cookieParser from "cookie-parser";


import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import workflowRouter from './routes/workflow.routes.js';

import connectToDatabase from "./mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/subscription', subscriptionRouter)
app.use(arcjetMiddleware);
app.use('/api/v1/workflows', workflowRouter)
app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Welcome to the subscription Tracker API');
});

app.listen(PORT,async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

   await connectToDatabase()
})

console.log("Loaded routes:");
app._router.stack.forEach((m) => {
    if (m.route) {
        console.log(`${Object.keys(m.route.methods)[0].toUpperCase()} ${m.route.path}`);
    }
});

export default app
