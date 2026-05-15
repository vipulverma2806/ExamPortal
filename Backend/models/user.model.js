import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,//
      // minlength: 2,
      maxlength: 50,

    },
    courseName: {
      type: String,
      required: true,
      trim: true,
      // minlength: 2,
      maxlength: 10,
    },
    rollNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      // minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;

// -- EXAMPORTAL APP users Table for postgres
// CREATE TABLE users (
// userId SERIAL PRIMARY KEY,
// name VARCHAR(50) NOT NULL,
// courseName VARCHAR(10) NOT NULL,
// rollNo INTEGER NOT NULL UNIQUE,
// email TEXT NOT NULL UNIQUE,
// password TEXT NOT NULL,
// role VARCHAR(10) DEFAULT 'student'
// CHECK (role IN ('student','teacher')),
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )