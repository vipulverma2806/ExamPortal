import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    timeSpents: {
      type: Map,
      of: Number,
      default: {},
    },

    selectedOptions: {
      type: Map,
      of: String,
      default: {},
    },
    rightAnswers: {
      type: Number,
      default: 0,
      required: true,
    },
    wrongAnswers: {
      type: Number,
      default: 0,
      required: true,
    },
    totalMarks: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const Attempt = mongoose.model("Attempt", attemptSchema);

export default Attempt;
