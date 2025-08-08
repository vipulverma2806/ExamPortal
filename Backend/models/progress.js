const mongoose = require("mongoose");
const progressSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  category: String,
  correctAnswers: Number,
  wrongAnswers: Number,
});

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
