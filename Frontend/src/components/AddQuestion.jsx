import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/add-question', {
      question,
      options,
      answer,
      category,
    });
    setQuestion('');
    setOptions(['', '', '', '']);
    setAnswer('');
    setCategory('');
  };

  return (
    <div className="add-question-container">
      <h1 className="title">Add Question</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input-field"
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="form-group">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="input-field"
            />
          </div>
        ))}
        <div className="form-group">
          <input
            type="text"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">Add Question</button>
      </form>
    </div>
  );
};

export default AddQuestion;
