import React, { useState, useEffect } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Quiz = () => {
  axios.defaults.withCredentials = true;
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [name, setName] = useState();
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

    const fetchName = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getName");
        console.log(res.data);
        setName(res.data);
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };

    fetchName();
    fetchQuestions();
  }, [category]);

  const handleAnswerOptionClick = (option) => {
    let correctAns = correctAnswers;
    let wrongAns = wrongAnswers;

    if (option === questions[currentQuestion].answer) {
      setScore((prev)=>prev + 1);
      correctAns += 1;
      setCorrectAnswers((prev)=>prev + 1);
    } else {
      setWrongAnswers((prev)=>prev + 1);
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

  const saveProgress = async (correctAns) => {
    await axios.post("http://localhost:5000/api/save-progress", {
      category,
      correctAnswers : correctAns,
      wrongAnswers,
    })
   
    
  
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setWrongAnswers(0);
    setCorrectAnswers(0);
    setShowResult(false);
    // navigate("/");
  };

  const handlePick = (index) => {
    console.log(index);
    setCurrentQuestion(index);
  };

  return (
    <><Navbar />
    <div className="flex  w-full bg-gray-800 h-[549px] border-t-2 border-white">
      <div className="w-3/4 border-r-2 border-white flex justify-center items-center h-full">
        {showResult ? (
          <div className="bg-gray-700 p-10  rounded-3xl">
            <h1 className="text-3xl text-center font-semibold text-gray-200">Your Score: {score}</h1>
            <button className="text-gray-300 bg-blue-700 p-2 rounded-xl w-full mt-3 text-center font-semibold hover:bg-blue-800" onClick={restartQuiz}>
              Restart Quiz
            </button>
            <Link to="/user-dashboard">
            <button className="text-gray-300 bg-green-700 p-2 rounded-xl w-full mt-3 text-center font-semibold hover:bg-green-800">
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
                  <div className="flex text-white w-full  flex-col">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        className=" bg-gray-500 text-xl m-1 w-full rounded-xl p-4 hover:bg-blue-600"
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
                className="bg-blue-700 text-white w-30 disabled:bg-gray-700 px-3 py-2 rounded-xl cursor-pointer disabled:cursor-auto"
              >
                Previous
              </button>
              <button
                disabled={currentQuestion === questions.length - 1}
                onClick={() =>
                  setCurrentQuestion((prev) =>
                    Math.min(prev + 1, questions.length - 1)
                  )
                }
                className="bg-blue-700 disabled:bg-gray-700 text-white px-3 py-2 w-30 rounded-xl cursor-pointer disabled:cursor-auto"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-1/4  flex flex-col">
        <div className="h-1/10 text-gray-300  flex pl-3 items-center font-bold text-2xl">
          Welcome {name}
        </div>
        <div className="h-1/10 text-gray-300 border-t-2 flex pl-3 items-center font-bold text-xl">
          Category: {category}
        </div>
        <div className="h-4/5 border-y-2 border-white">
          <h2 className="m-2 text-gray-300 text-xl pl-2 font-semibold">Go to Question</h2>
          <div className="grid gap-y-3 gap-x-3 mx-3 grid-cols-4">
            {questions.map((q, i) => (
              <div className="flex justify-center items-center">
                <button
                  className="h-16 w-16 bg-gray-500 rounded-xl hover:bg-gray-900 text-white items-center justify-center flex"
                  onClick={() => handlePick(i)}
                >
                  {i + 1}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-around items-center  p-3">
          <p className="text-gray-300  p-2 rounded-xl w-28 text-left font-semibold">
            Your Score: {score}
          </p>
          <button className="text-gray-300 bg-blue-700 p-2 rounded-xl w-28 text-left font-semibold" onClick={restartQuiz}>
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Quiz;
