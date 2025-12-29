import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Quiz = () => {
  axios.defaults.withCredentials = true;
  const { subject } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [name, setName] = useState();

  const navigate = useNavigate();

  // ✅ TIMER STATES
  const [entryTime, setEntryTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState({}); // stores time per question

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/questions/${subject}`
        );
        setQuestions(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchName = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getName");
        setName(res.data);
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };

    fetchName();
    fetchQuestions();
  }, [subject]);

  // ⏱️ Start timer when questions load OR when current question changes
  useEffect(() => {
    if (questions.length === 0) return;
    setEntryTime(Date.now()); // start tracking entry time
  }, [currentQuestion, questions]);

  // ⏱️ Function to store time spent on current question
  const recordTime = () => {
    if (!entryTime) return;

    const exitTime = Date.now();
    const diff = Math.floor((exitTime - entryTime) / 1000); // seconds

    setTimeSpent((prev) => ({
      ...prev,
      [currentQuestion]: (prev[currentQuestion] || 0) + diff,
    }));
  };

  // -----------------------------------------------------------
  // ANSWER CLICK HANDLER
  // -----------------------------------------------------------
  const handleAnswerOptionClick = (option) => {
    recordTime(); // ⏱️ Save time before switching question

    let correctAns = correctAnswers;
    let wrongAns = wrongAnswers;

    if (option === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
      correctAns += 1;
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
      wrongAns += 1;
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      saveProgress(correctAns);
    }
  };

  // -----------------------------------------------------------
  // SAVE PROGRESS
  // -----------------------------------------------------------
  const saveProgress = async (correctAns) => {
    recordTime(); // save final question time

    await axios.post("http://localhost:5000/api/save-progress", {
      subject,
      correctAnswers: correctAns,
      wrongAnswers,
      timeSpent, // ⏱️ send timing data
    });
  };

  // -----------------------------------------------------------
  // Restart quiz
  // -----------------------------------------------------------
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setWrongAnswers(0);
    setCorrectAnswers(0);
    setShowResult(false);
    setTimeSpent({});
    setEntryTime(Date.now());
  };

  const handlePick = (index) => {
    recordTime();
    setCurrentQuestion(index);
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full bg-gray-800 h-[549px] border-t-2 border-white">
        <div className="w-3/4 border-r-2 border-white flex justify-center items-center h-full">
          {showResult ? (
            <div className="bg-gray-700 p-10 rounded-3xl">
              <h1 className="text-3xl text-center font-semibold text-gray-200">
                Your Score: {score}
              </h1>
              <button
                className="text-gray-300 bg-blue-700 p-2 rounded-xl w-full mt-3"
                onClick={restartQuiz}
              >
                Restart Quiz
              </button>
              <Link to="/user-dashboard">
                <button className="text-gray-300 bg-green-700 p-2 rounded-xl w-full mt-3">
                  User Dashboard
                </button>
              </Link>
            </div>
          ) : (
            <div className="h-[549px] w-full flex justify-center flex-col items-center">
              <div className="w-full px-30 mb-30">
                {questions.length > 0 && (
                  <>
                    <h1 className="text-3xl text-gray-200 font-semibold mb-3">
                      <span>Q.{currentQuestion + 1} </span>{" "}
                      {questions[currentQuestion].question}
                    </h1>

                    <div className="flex text-white w-full flex-col">
                      {questions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          className="bg-gray-500 text-xl m-1 w-full rounded-xl p-4 hover:bg-blue-600"
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
                  onClick={() => {
                    recordTime();
                    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
                  }}
                  className="bg-blue-700 text-white px-3 py-2 rounded-xl disabled:bg-gray-700"
                >
                  Previous
                </button>

                <button
                  disabled={currentQuestion === questions.length - 1}
                  onClick={() => {
                    recordTime();
                    setCurrentQuestion((prev) =>
                      Math.min(prev + 1, questions.length - 1)
                    );
                  }}
                  className="bg-blue-700 text-white px-3 py-2 rounded-xl disabled:bg-gray-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-1/4 flex flex-col">
          <div className="h-1/10 text-gray-300 pl-3 font-bold text-2xl">
            Welcome {name}
          </div>

          <div className="h-1/10 text-gray-300 border-t-2 pl-3 text-xl font-bold">
            subject: {subject}
          </div>

          <div className="h-4/5 border-y-2 border-white">
            <h2 className="m-2 text-gray-300 text-xl pl-2 font-semibold">
              Go to Question
            </h2>

            <div className="grid gap-y-3 gap-x-3 mx-3 grid-cols-4">
              {questions.map((q, i) => (
                <div key={i} className="flex justify-center items-center">
                  <button
                    className="h-16 w-16 bg-gray-500 rounded-xl hover:bg-gray-900 text-white"
                    onClick={() => handlePick(i)}
                  >
                    {i + 1}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-around items-center p-3">
            <p className="text-gray-300 p-2 rounded-xl w-28 font-semibold">
              Score: {score}
            </p>
            <button
              className="text-gray-300 bg-blue-700 p-2 rounded-xl w-28 font-semibold"
              onClick={restartQuiz}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;


import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // Initial time in seconds (3 hours)

    useEffect(() => {
        let timer;

        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000); // Decrease every second
        }

        // Cleanup function to clear the interval
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Format time in HH:MM:SS
    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const remainingSeconds = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${remainingSeconds}`;
    };

    return (
        <div>
            <h1>3-Hour Countdown Timer</h1>
            <div>{formatTime(timeLeft)}</div>
            {timeLeft === 0 && <h2>Time's Up!</h2>} {/* Message when timer is done */}
        </div>
    );
};

export default Timer;
