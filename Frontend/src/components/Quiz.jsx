import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/questions/${category}`
        );
        setQuestions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestions();
  }, [category]);

  const handleAnswerOptionClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      saveProgress();
    }
  };

  const saveProgress = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/save-progress",
      {
        category,
        correctAnswers,
        wrongAnswers,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    // navigate("/");
  };

  const handlePick = (index) => {
    console.log(index);
    setCurrentQuestion(index);
  };

  return (
    <div className="flex w-full h-[549px]">
      <div className="w-3/4 border-r-2 flex justify-center items-center h-full">
        {showResult ? (
          <div className="result-section">
            <h1>Your Score: {score}</h1>
            <button className="restart-button" onClick={restartQuiz}>
              Restart Quiz
            </button>
          </div>
        ) : (
          <div className="h-[549px] w-full flex justify-center flex-col items-center">
            <div className="w-full px-30 mb-30">
              {questions.length > 0 && (
                <>
                  <h1 className="text-2xl">
                    <span>Q.{currentQuestion + 1} </span>{" "}
                    {questions[currentQuestion].question}
                  </h1>
                  <div className="flex text-white w-full  flex-col">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        className=" bg-gray-500 m-1 w-full rounded-xl p-4 hover:bg-gray-800"
                        onClick={() => handleAnswerOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex w-full justify-between px-30">
              <button
                disabled={currentQuestion === 0}
                onClick={() =>
                  setCurrentQuestion((prev) => Math.max(prev - 1, 0))
                }
                className="bg-blue-700 text-white w-30 disabled:bg-gray-700 px-3 py-2 rounded-xl"
              >
                Previous
              </button>
              <button
                disabled = {currentQuestion === questions.length-1}
                onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length-1))}
                className="bg-blue-700 disabled:bg-gray-700 text-white px-3 py-2 w-30 rounded-xl"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-1/4  flex flex-col">
        <div className="h-1/10">Welcome User</div>
        <div className="h-4/5 border-y-2 ">
          <h2 className="m-2">Choose a Question</h2>
          <div className="grid grid-cols-5 ">
            {questions.map((q, i) => (
              <div className="flex justify-center items-center">
                <button
                  className="h-12 w-12 bg-gray-500 rounded-xl hover:bg-gray-900 text-white items-center justify-center flex"
                  onClick={() => handlePick(i)}
                >
                  {i + 1}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="">
            <p className="text-2xl m-0">Your Score: {score}</p>
            <button className="" onClick={restartQuiz}>
              Restart Quiz
            </button>
          </div>
      </div>
    </div>
  );
};

export default Quiz;
