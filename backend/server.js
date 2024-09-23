import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { connectToMongoDB } from './db/connectToMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import msgRoutes from './routes/msgRoutes.js';
import usersRoute from './routes/usersRoute.js';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.listen(PORT, () => {
    connectToMongoDB();
    console.log("server is running on port 2806");
})
// routes
app.get('/', (req, res) => {
    res.send("Hello World");
})
// auth routes
app.use('/api/auth', authRoutes)
// msg routes
app.use('/api/msg', msgRoutes)
app.use('/api/users', usersRoute)
