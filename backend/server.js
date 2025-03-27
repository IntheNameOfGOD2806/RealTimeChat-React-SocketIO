import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { connectToMongoDB } from './db/connectToMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import msgRoutes from './routes/msgRoutes.js';
import usersRoute from './routes/usersRoute.js';
import { app, server } from './socket/socket.js';
dotenv.config();
import cors from 'cors';
import CloudUpload from './routes/cloud-upload.js';
app.use(cors({
    origin: "http://localhost:5173", // Cho phép React frontend truy cập
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Nếu dùng cookie hoặc token
}));
// const app = express();
app.use(express.json());
app.use(cookieParser())
const __dirname = path.resolve();
// auth routes
app.use('/api/auth', authRoutes)
// msg routes
app.use('/api/msg', msgRoutes)
app.use('/api/users', usersRoute)
app.use('/api/cloud-upload',
    CloudUpload
  )
app.use(express.static(path.join(__dirname, '/frontend/dist')))
const PORT = process.env.PORT || 2806;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})
server.listen(PORT, () => {
    connectToMongoDB();
    console.log("server is running on port 2806");
})
// app.get('/', (req, res) => {
//     console.log("check cookie", req.cookies);
//     res.send("Hello World");
// })
