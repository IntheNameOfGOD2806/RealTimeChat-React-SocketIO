import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectToMongoDB } from './db/connectToMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import msgRoutes from './routes/msgRoutes.js';
import usersRoute from './routes/usersRoute.js';
const app = express();
app.use(cookieParser())
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    connectToMongoDB();
    console.log("server is running on port 2806");
})
app.get('/', (req, res) => {
    console.log("check cookie", req.cookies);
    res.send("Hello World");
})
// auth routes
app.use('/api/auth', authRoutes)
// msg routes
app.use('/api/msg', msgRoutes)
app.use('/api/users', usersRoute)
