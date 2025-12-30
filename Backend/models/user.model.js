import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
      trim: true,
      // minlength: 2,
      maxlength: 50,
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
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
