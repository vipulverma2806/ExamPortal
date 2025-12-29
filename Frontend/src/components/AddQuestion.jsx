import React, { useState } from "react";
import axios from "axios";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [subject, setsubject] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/add-question", {
      question,
      options,
      answer,
      subject,
    });
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    setsubject("");
  };

  return (
    <div className="flex-1 text-gray-200 pt-8 bg-gray-800 flex justify-center items-center flex-col">
      <div className="bg-gray-700 w-5xl  p-10 rounded-2xl">
        <h1 className="text-5xl font-bold mb-4 text-center">Add Question</h1>
        <form onSubmit={handleSubmit} className="flex gap-y-5 flex-col">
          <div className="bg-gray-600 p-3 rounded-xl">
            <input
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
          {options.map((option, index) => (
            <div key={index} className="bg-gray-600 p-3 rounded-xl">
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full focus:outline-none"
              />
            </div>
          ))}
          <div className="bg-gray-600 p-3 rounded-xl">
            <input
              type="text"
              placeholder="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
          <div className="bg-gray-600 p-3 rounded-xl">
            <input
              type="text"
              placeholder="subject"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>
          <button type="submit" className="bg-green-700 p-4 w-xs rounded-2xl">
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
