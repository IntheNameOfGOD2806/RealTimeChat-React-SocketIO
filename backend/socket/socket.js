import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const userSccketMap = {};
export const getReceiverSocketId = (receiverId) => {
  return userSccketMap[receiverId];
};
io.on("connection", (socket) => {
  // handshake data
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSccketMap[userId] = socket.id;
  }
  //io emits to all connected users
  io.emit("getOnlineUsers", Object.keys(userSccketMap));
  console.log("a user connected", socket.id, userId);
  // socket.on("message", (data) => {
  //     // console.log("message received", data);
  //     io.emit("receive_message", data);
  // });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSccketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSccketMap));
  });
});

// server.listen(2806, () => {
//     console.log("listening on *:2806");
// });

export { app, io, server };
