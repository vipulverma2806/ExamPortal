const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser")
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(cookieParser())

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

app.listen(PORT, () => {
  console.log(`Server running on Port:${PORT}`);
});
