import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;
app.use(cookieParser());

dbConnect();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/userRoutes", userRoutes);
app.use("/auth", authRoutes);
app.use("/adminRoutes", adminRoutes);
app.listen(PORT, () => {
  console.log(`Server running on Port:${PORT}`);
});
