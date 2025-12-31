import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";
const AddExam = () => {
  axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(false);
  const [genQuestions, setGenQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [difficultyLevel, setDifficultylevel] = useState("");
  const [questionCount, setQuestionCount] = useState(null);
  const subjectsArr = [
    "DSA",
    "Operating Systems",
    "Computer Networks",
    "DBMS",
    "Software Engineering",
    "Machine Learning",
    "Web Development",
    "Artificial Intelligence",
    "Computer Graphics",
  ];
  const difficultyLevelArr = ["Hard", "Moderate", "Easy"];

  //------------generate Question--------------------------------
  const generateQuestions = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(
        selectedSubject,
        selectedTopic,
        difficultyLevel,
        questionCount
      );
      const res = await axios.post(
        `http://localhost:5000/adminRoutes/generateQuestions`,
        {
          selectedSubject,
          selectedTopic,
          difficultyLevel,
          questionCount,
        }
      );
      console.log(res);
      setGenQuestions(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  //--------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/add-question", {
        genQuestions,
      });
      setLoading(false);
      setGenQuestions([]);
      setDifficultylevel("");
      setQuestionCount(0);
      setSelectedSubject("");
      setSelectedTopic("");
      toast.success(`${genQuestions.length} Questions Added Successfully`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const rejectQuestion = (index) => {
    setGenQuestions((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  return (
    <div className="p-4 pt-2 flex flex-col">
      <div className="border-b-4 items-center px-3 flex justify-between  h-20 py-2 ">
        <div className="text-4xl font-semibold flex items-center  ">
          AI Question Generator
        </div>
        <div className="bg-gray-300 h-full flex items-center justify-center w-50 rounded-4xl my-5 mb-8">
          <img
            src="../../public/gemini2.png"
            className="object-cover h-10 bg-gray-300 rounded-xl   "
            alt="Description"
          />
        </div>
      </div>
      <div className="bg-gray-200 p-6 px-10 pb-0 mt-5 rounded-xl text-black">
        <form action="" className=" " onSubmit={(e) => generateQuestions(e)}>
          <div className="flex justify-between  font-semibold text-xl ">
            <div className="flex flex-col w-45 gap-2">
              <label htmlFor="">Subject:</label>
              <select
                required
                name=""
                id=""
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border p-1 rounded-xl "
              >
                <option value="" disabled selected hidden className="text-gray-400">
                  Select Subject
                </option>
                {subjectsArr.map((subject, i) => {
                  return <option value={subject}>{subject}</option>;
                })}
              </select>
            </div>
            <div className="flex flex-col w-45 gap-2 ">
              <label htmlFor="">Topic:</label>
              <input
                value={selectedTopic}
                type="text"
                onChange={(e) => setSelectedTopic(e.target.value.trim())}
                className="border p-1 rounded-xl"
              />
            </div>
            <div className="flex flex-col w-45 gap-2 ">
              <label htmlFor="">Difficulty Level:</label>
              <select
                value={difficultyLevel}
                required
                name=""
                id=""
                onChange={(e) => setDifficultylevel(e.target.value)}
                className="border p-1 rounded-xl"
              >
                <option className="text-gray-400" disabled selected hidden value="">
                  Select level
                </option>
                {difficultyLevelArr.map((level, i) => {
                  return <option value={level}>{level}</option>;
                })}
              </select>
            </div>

            <div className="flex flex-col  gap-2 w-45 ">
              <label htmlFor="">No. of Questions:</label>
              <input
                value={questionCount}
                required
                onChange={(e) => setQuestionCount(e.target.value)}
                type="number"
                className="border p-1 rounded-xl"
              />
            </div>
          </div>
          <div className="h-30 flex justify-center items-center ">
            <button
              type="submit"
              disabled={
                difficultyLevel && selectedSubject && questionCount
                  ? loading
                  : true
              }
              className={` font-semibold text-white py-3  cursor-pointer px-10 rounded-xl ${
                loading
                  ? "bg-green-500 hover:cursor-not-allowed"
                  : difficultyLevel && selectedSubject && questionCount
                  ? "bg-blue-700"
                  : "bg-gray-500 hover:cursor-not-allowed"
              }
              }  `}
            >
              {loading ? "Loading..." : "Generate Questions"}
            </button>
          </div>
        </form>
      </div>
      {genQuestions.length ? (
        <div className="bg-gray-200 p-6 px-10 pb-0 mt-5 rounded-xl text-black">
          <div className="font-semibold text-3xl border-b-gray-400 border-b-2 pb-2">
            Generated Questions
          </div>
          {genQuestions.map((question, i) => {
            return (
              <div className="border-2 bg-slate-300 my-5 rounded-2xl p-4 pr-0">
                <div className="p-3  font-semibold  flex justify-between">
                  <div className="text-2xl">
                    <span className="mr-2">{i + 1}.</span>
                    <span>{question.question}</span>
                  </div>

                  <button
                    onClick={() => rejectQuestion(i)}
                    className="flex items-center gap-2 bg-red-600 px-3 h-8 rounded-lg text-white hover:bg-red-900 transition cursor-pointer"
                  >
                    <MdDeleteSweep className="text-xl" />
                    <span className="font-semibold text-md ">Reject</span>
                  </button>
                </div>
                <div className="p-3 px-8 my-3 pt-0  text-xl flex flex-col gap-2">
                  <p>A. {question.options[0]}</p>
                  <p>B. {question.options[1]}</p>
                  <p>C. {question.options[2]}</p>
                  <p>D. {question.options[3]}</p>
                </div>
                <p className="font-semibold text-xl px-8">
                  Answer:
                  {question.answer === question.options[0] && " A"}
                  {question.answer === question.options[1] && " B"}
                  {question.answer === question.options[2] && " C"}
                  {question.answer === question.options[3] && " D"}
                </p>
              </div>
            );
          })}
          <div className="h-25 flex justify-between items-center ">
            <button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className={` font-semibold text-white py-3 w-50 cursor-pointer px-8 rounded-xl ${
                loading ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {loading ? "Loading..." : "Approve & Publish"}
            </button>
            <button
              onClick={(e) => generateQuestions(e)}
              type="submit"
              className={` font-semibold text-white py-3 w-50 cursor-pointer px-8 rounded-xl ${
                loading ? "bg-cyan-500" : "bg-emerald-700"
              }`}
            >
              {loading ? "Loading..." : "Regenrate"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddExam;
