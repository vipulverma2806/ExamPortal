import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Quiz2 = () => {
  axios.defaults.withCredentials = true;
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60);
  const [userInfo, setUserInfo] = useState({});
  const [entryTime, setEntryTime] = useState();
  const [timeSpents, setTimeSpents] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/questions/${category}`
        );
        setQuestions(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchName = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getName");
        // console.log("response data", res.data);

        setUserInfo(res.data);
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };
    fetchName();
    fetchQuestions();
  }, [category]);

  //----timer---------------
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;
    setEntryTime(Date.now());
  }, [currentQuestion, questions]);

  const recordTime = (option) => {
    const exitTime = Date.now();
    if (!entryTime) return;
    const timePeriod = Math.floor(((exitTime - entryTime) / 1000) * 100) / 100;
    setTimeSpents((prev) => ({
      ...prev,
      [questions[currentQuestion]._id]:
        (prev[questions[currentQuestion]._id] || 0) + timePeriod,
    }));
    setSelectedOptions((prev) => ({
      ...prev,
      [questions[currentQuestion]._id]: option || null,
    }));
  };
  // console.log(selectedOptions);
  // console.log(timeSpents);
  const handleAnswerOptionClick = (option) => {
    // let correctAns = correctAnswers;
    // let wrongAns = wrongAnswers;
    // setExitTime(Date.now())
    recordTime(option);
    // console.log(questions[currentQuestion])
    // console.log("currentQuestion",currentQuestion)

    // if (option === questions[currentQuestion].answer) {
    //   // setScore((prev) => prev + 1);
    //   correctAns += 1;
    //   setCorrectAnswers((prev) => prev + 1);
    // } else {
    //   setWrongAnswers((prev) => prev + 1);
    //   wrongAns += 1;
    // }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      saveProgress(correctAns);
    }
  };
  useEffect(() => {
    if (timeLeft <= 0) {
      return saveProgress();
    }
  }, [timeLeft]);
  const saveProgress = async (correctAns) => {
    console.log("saved progress");
    // try {
    //   await axios.post("http://localhost:5000/api/save-progress", {
    //     userId: userInfo,
    //     category,
    //     timeSpents,
    //     selectedOptions,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  // const restartQuiz = () => {
  //   setCurrentQuestion(0);

  //   setWrongAnswers(0);
  //   setCorrectAnswers(0);
  //   setShowResult(false);
  //   // navigate("/");
  // };

  const handlePick = (index) => {
    recordTime();
    // console.log(index);
    setCurrentQuestion(index);
  };

  const showTimer = (seconds) => {
    const hour = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secondsLeft = String(seconds % 60).padStart(2, "0");

    return `${hour}:${minutes}:${secondsLeft}`;
  };

  return (
    <>
      <Navbar />

      <div className="flex w-full bg-gray-900 min-h-screen border-t border-gray-700">
        {/* LEFT: MAIN QUIZ AREA */}
        <div className="lg:w-3/4 w-full border-r border-gray-700 flex justify-center items-center p-6">
          {showResult ? (
            <div className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-lg text-center">
              <h1 className="text-2xl font-semibold text-gray-200 mb-4">
                Quiz Completed
              </h1>

              <button
                className="w-full py-3 mt-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-gray-100 font-semibold"
                onClick={saveProgress}
              >
                Submit Exam
              </button>

              <Link to="/user-dashboard">
                <button className="w-full py-3 mt-3 rounded-xl bg-green-600 hover:bg-green-700 text-gray-100 font-semibold">
                  User Dashboard
                </button>
              </Link>
            </div>
          ) : (
            <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-xl shadow-xl">
              {questions.length > 0 && (
                <>
                  <h1 className="text-2xl text-gray-100 font-semibold mb-6">
                    <span className="text-blue-400">
                      Q.{currentQuestion + 1}
                    </span>{" "}
                    {questions[currentQuestion].question}
                  </h1>

                  {/* OPTIONS */}
                  <div className="flex flex-col gap-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerOptionClick(option)}
                        className="px-5 py-3 bg-gray-700 hover:bg-blue-600 transition rounded-xl text-gray-200 text-left"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* NAVIGATION */}
              <div className="flex justify-between mt-8">
                <button
                  disabled={currentQuestion === 0}
                  onClick={() => {
                    recordTime();
                    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
                  }}
                  className={`px-5 py-2 rounded-xl font-medium 
                ${
                  currentQuestion === 0
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800 text-gray-100"
                }`}
                >
                  Previous
                </button>

                <button
                  className="px-5 py-2 rounded-xl font-semibold bg-teal-700 hover:bg-teal-800 text-gray-100"
                  onClick={saveProgress}
                >
                  Submit Exam
                </button>

                <button
                  disabled={currentQuestion === questions.length - 1}
                  onClick={() => {
                    recordTime();
                    setCurrentQuestion((prev) =>
                      Math.min(prev + 1, questions.length - 1)
                    );
                  }}
                  className={`px-5 py-2 rounded-xl font-medium 
                ${
                  currentQuestion === questions.length - 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800 text-gray-100"
                }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:w-1/4 hidden lg:flex flex-col bg-gray-800 border-l border-gray-700">
          <div className="p-5 text-gray-200 text-2xl font-semibold border-b border-gray-700">
            Welcome, {userInfo.name}
          </div>

          <div className="p-4 text-gray-300 text-xl border-b border-gray-700">
            Category: <span className="text-blue-400">{category}</span>
          </div>

          <div className="p-4 text-gray-100 text-xl border-b border-gray-700">
            ⏳ Time Left:{" "}
            <span className="text-red-400">{showTimer(timeLeft)}</span>
          </div>

          <div className="flex flex-col p-4 h-full overflow-y-auto">
            <h2 className="text-gray-300 text-lg font-semibold mb-3">
              Go to Question
            </h2>

            <div className="grid grid-cols-4 gap-4">
              {questions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handlePick(i)}
                  className={`h-14 w-14 rounded-xl flex items-center justify-center text-gray-200 font-semibold 
                ${
                  currentQuestion === i
                    ? "bg-blue-600"
                    : "bg-gray-700 hover:bg-gray-900"
                }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz2;
