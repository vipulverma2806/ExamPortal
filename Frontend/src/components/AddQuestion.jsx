import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [optionsObj, setOptionsObj] = useState({ A: "", B: "", C: "", D: "" });
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const optionsLabel = Object.keys(optionsObj);
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

  const labelCss = "font-semibold text-xl block mb-2";
  const handleOptionInput = (option, value) => {
    setOptionsObj((prev) => ({ ...prev, [option]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(question, optionsObj, selectedAnswer, selectedSubject);
      await axios.post("http://localhost:5000/adminRoutes/add-question", {
        question,
        optionsObj:optionsObj,
        selectedAnswer,
        selectedSubject,
      });
      setQuestion("")
      setOptionsObj({ A: "", B: "", C: "", D: "" })
      setLoading(false)
      setSelectedAnswer("")
      setSelectedSubject("")
      toast.success("add question successfull")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 text-black pt-8  flex justify-center items-center flex-col">
      <div className="border-b-4 items-center border-b-white w-full px-3 flex justify-between  h-20 py-2 ">
        <h1 className="text-4xl font-semibold text-white flex items-center ">
          Add Questions Manually
        </h1>
      </div>

      <div className="bg-gray-200 w-full p-6 px-10 pb-0 mt-5 rounded-xl text-black">
        <form onSubmit={handleSubmit} className="flex gap-y-5 flex-col ">
          <div className=" flex flex-col px-3 gap-2 w-full ">
            <label htmlFor="" className={labelCss}>
              Question:
            </label>
            <input
              required
              type="text"
             
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border p-3 rounded-xl  w-full "
            />
          </div>
          {optionsLabel.map((option, index) => (
            <div key={index} className=" px-3  rounded-xl ">
              <label htmlFor="" className={labelCss}>
                Option {option}:
              </label>
              <input
                required
                type="text"
                value={optionsObj[option]}
                onChange={(e) => handleOptionInput(option,e.target.value)}
                className="border p-3 rounded-xl w-full"
              />
            </div>
          ))}
          <div className="flex justify-between  px-3 gap-x-10  w-full">
            <div className=" rounded-xl w-1/2 ">
              <label htmlFor="" className={labelCss}>
                Select Answer:
              </label>
              <select
                required
                name=""
                id=""
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="border p-3 w-full rounded-xl "
              >
                <option value="" disabled selected hidden className="">
                  Options
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2 ">
              <label htmlFor="" className={labelCss}>
                Subject:
              </label>
              <select
                required
                name=""
                id=""
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border p-3 rounded-xl "
              >
                <option value="" disabled selected hidden className="">
                  Select Subject
                </option>
                {subjectsArr.map((subject, i) => {
                  return <option value={subject}>{subject}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="h-25 flex justify-center items-center ">
            <button
              type="submit"
              disabled={loading}
              className={` font-semibold text-white py-3  cursor-pointer px-10 rounded-xl ${
                loading
                  ? "bg-green-500 hover:cursor-not-allowed"
                  : "bg-blue-700"
              }
              }  `}
            >
              {loading ? "Loading..." : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
