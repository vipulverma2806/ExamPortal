import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_URL;
const Quiz = () => {
  axios.defaults.withCredentials = true;
  const { subject } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [, setScore] = useState(0);
  const [lastQ, setLastQ] = useState(false);
  // const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60);
  const [userInfo, setUserInfo] = useState({});
  const [entryTime, setEntryTime] = useState();
  const [timeSpents, setTimeSpents] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [attemptId, setAttemptId] = useState("");
  const [saveButton, setSaveButton] = useState(false);
  const navigate = useNavigate();
  // console.log("this console log running continuously ")
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${URL}/userRoutes/questions/${subject}`
        );
        setQuestions(res.data);
        for (let i = 1; i <= res.data.length; i++) {
          setTimeSpents((prev) => ({ ...prev, [i]: 0 }));
        }
        res.data.forEach((que) => {
          setSelectedOptions((prev) => ({ ...prev, [que._id]: null }));
        });
        console.log(timeSpents);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchName = async () => {
      try {
        const res = await axios.get(`${URL}/userRoutes/getName`);
        // console.log("response data", res.data);

        setUserInfo(res.data.data);
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };
    fetchName();
    fetchQuestions();
  }, [subject]);

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
      // [questions[currentQuestion]._id]:
      //   (prev[questions[currentQuestion]._id] || 0) + timePeriod,
      [currentQuestion + 1]:
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
      setCurrentQuestion(0);
    }
  };
  useEffect(() => {
    if (timeLeft <= 0) {
      return saveProgress();
    }
  }, [timeLeft]);

  const saveProgress = async () => {
    console.log("saved progress");
    console.log(timeSpents);
    console.log(selectedOptions);
    try {
      setSaveButton(true);
      await axios.post(`${URL}/userRoutes/save-progress`, {
        userId: userInfo,
        subject,
        timeSpents,
        selectedOptions,
      });
      toast.success("Exam Completed");
      navigate("/quizHome");
      setSaveButton(false);
      // console.log(timeSpents)
    } catch (err) {
      setSaveButton(false);
      console.log(err);
      toast.error("Some error occurred");
    }
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

      <div className="flex  w-full bg-gray-900 h-full  border-t-2 border-white">
        <div className="lg:w-3/4 w-full border-r-2 p-15 mt-10 border-gray-700 flex justify-center items-center h-full ">
          <div className=" w-full bg-gray-800  flex justify-center flex-col items-center py-10  border rounded-3xl">
            <div className="w-full h-full  px-20 ">
              {questions.length > 0 && (
                <>
                  <h1 className="text-3xl text-gray-200 font-semibold mb-3">
                    <span>Q.{currentQuestion + 1} </span>{" "}
                    {questions[currentQuestion].question}
                  </h1>
                  <div className="flex text-white w-full gap-y-2 flex-col">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        className=" bg-gray-700 text-left text-xl m-1 w-full rounded-xl px-6 py-2 hover:bg-blue-600"
                        onClick={() => handleAnswerOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
              <div className="flex w-full mt-10 justify-between px-5">
                <button
                  disabled={currentQuestion === 0}
                  onClick={() => {
                    recordTime();
                    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
                  }}
                  className="bg-blue-700 text-white w-30 disabled:bg-gray-700 px-3 py-2 rounded-xl cursor-pointer disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  disabled={saveButton}
                  className="text-gray-100 hover:bg-teal-900  cursor-pointer bg-teal-700 px-3 rounded-xl w-30 text-left font-semibold"
                  onClick={saveProgress}
                >
                  {`${saveButton ? "Wait" : "Submit Exam"}`}
                </button>
                <button
                  disabled={currentQuestion === questions.length - 1}
                  onClick={() => {
                    recordTime();
                    setCurrentQuestion((prev) =>
                      Math.min(prev + 1, questions.length - 1)
                    );
                  }}
                  className={`bg-blue-700 disabled:bg-gray-700 text-white px-3 py-2 w-30 rounded-xl cursor-pointer  disabled:cursor-not-allowed`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/4 hidden pt-18    bg-gray-800 lg:flex lg:flex-col">
          <div className=" text-gray-300 py-2 flex pl-3 items-center font-bold text-2xl">
            <span className="mr-2">Welcome</span>
            <span className="text-yellow-500">{userInfo.name}</span>
          </div>
          <div className=" text-gray-300 py-2 border-gray-500 border-t-2 flex pl-3 items-center font-bold text-xl">
            <span className="mr-3">Subject :</span>{" "}
            <span className=" text-blue-600">{subject}</span>
          </div>
          <div className="  flex pl-3 py-2 border-gray-500 border-t-2 items-center font-bold text-xl text-gray-300  p-2 text-left ">
            <span className="mr-2">Time Left :</span>{" "}
            <span className="text-red-500">{showTimer(timeLeft)}</span>
          </div>
          <div className=" border-y-2 border-gray-500 pb-6">
            <h2 className="m-2 text-gray-300 py-2 text-xl pl-2 font-semibold">
              Go to Question
            </h2>
            <div className="grid gap-y-3 gap-x-3  mx-3 grid-cols-4">
              {questions.map((q, i) => (
                <div className="flex justify-center mt-1 items-center">
                  <button
                    className={` ${
                      currentQuestion === i ? "bg-blue-600" : "bg-gray-600"
                    }
                    h-15 w-15  rounded-xl hover:bg-blue-400 text-white items-center shadow-xs shadow-amber-400 justify-center flex
                    
                    `}
                    onClick={() => handlePick(i)}
                  >
                    {i + 1}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
