const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  question: String,
  options: Array,
  answer: String,
  category: String,
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;