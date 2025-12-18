import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import apiRoutes from "./routes/apiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
const app = express();
configDotenv();
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
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);
app.use("/adminRoutes", adminRoutes);
app.listen(PORT, () => {
  console.log(`Server running on Port:${PORT}`);
});
