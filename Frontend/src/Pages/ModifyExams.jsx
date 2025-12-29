import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";
const ModifyExams = () => {
  const [subjectsArr, setSubjectsArr] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/Subjects");
        setSubjectsArr(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSubjects();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/questions/${selectedSubject}`
      );
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, [selectedSubject]);

  const deleteQuestion = async (id) => {
    try {
      const deleted = await axios.delete(
        `http://localhost:5000/adminRoutes/deleteQuestion/${id}`
      );
      fetchQuestions();
      toast.success("deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex justify-between px-15 py-5">
        <select
          required
          name=""
          id=""
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border p-1 bg-slate-800 px-3 py-2 rounded-xl w-60"
        >
          <option value="null" className="text-gray-800">
            Select
          </option>
          {subjectsArr.map((subject, i) => {
            return <option value={subject}>{subject}</option>;
          })}
        </select>
        <button
          onClick={() => deleteQuestion(selectedSubject)}
          className="flex items-center gap-2 bg-red-600 px-3 py-2  h-8 rounded-lg text-white hover:bg-red-900 transition cursor-pointer"
        >
          <MdDeleteSweep className="text-xl" />
          <span className="font-semibold text-md ">Delete All</span>
        </button>
      </div>
      <div className="px-10">
        {questions.length ? (
          <div className="bg-teal-700 p-6 px-10 pb-6 my-5  rounded-xl text-black">
            <div className="font-semibold text-3xl text-white border-b-gray-400 border-b-2 pb-2">
              {`All Questions of Subject: ${selectedSubject}`}
            </div>
            {questions.map((question, i) => {
              return (
                <div className="border-2 bg-slate-300 my-5 rounded-2xl p-4 pr-0">
                  <div className="p-3  font-semibold  flex justify-between">
                    <div className="text-2xl">
                      <span className="mr-2">{i + 1}.</span>
                      <span>{question.question}</span>
                    </div>

                    <button
                      onClick={() => deleteQuestion(question._id)}
                      className="flex items-center gap-2 bg-red-600 px-3 h-8 rounded-lg text-white hover:bg-red-900 transition cursor-pointer"
                    >
                      <MdDeleteSweep className="text-xl" />
                      <span className="font-semibold text-md ">Delete</span>
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ModifyExams;
