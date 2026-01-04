import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;
app.use(cookieParser());
dbConnect();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
app.set("io", io);
app.use("/userRoutes", userRoutes);
app.use("/auth", authRoutes);
app.use("/adminRoutes", adminRoutes);

io.on("connection", (socket) => {
  console.log("Admin connected", socket.id);
  socket.on("disconnect", () => {
    console.log("Admin Disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on Port:${PORT}`);
});
