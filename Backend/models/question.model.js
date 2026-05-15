import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;


// MONGO -> pg 
// CREATE TABLE questions (
// id SERIAL PRIMARY KEY,
// question TEXT NOT NULL,
// answer TEXT NOT NULL,
// subject VARCHAR(50) NOT NULL,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// )


// CREATE TABLE options(
// id SERIAL PRIMARY KEY,
// question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
// option_text TEXT NOT NULL 
// )