import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
axios.defaults.withCredentials = true;
const ReviewExams = () => {
  const [allQues, setAllQues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredQues, setFilteredQues] = useState([]);
  const [attemptCat, setAttemptCat] = useState("");
  const {attemptArr}= useOutletContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/reviewExam`);
        console.log("res", res);
        console.log("res data", res.data);
        setAllQues(res.data);
        const categoriesArr = attemptArr.map((attempt, i) => attempt.category);
        setCategories(categoriesArr);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const showCategory = (cat) => {
    const array = allQues.filter((que, i) => que.category == cat);
    setFilteredQues(array);
    const array2 = attemptArr.filter((que, i) => que.category == cat);
    setAttemptCat(array2);
  };
  // console.log("categories", categories);
  // console.log("attemptArr", attemptArr);
  // console.log("allQues",allQues)
  return (
    <div>
      <div className="flex py-3 justify-between  px-22">
        <div className="text-4xl font-semibold text-center ">Review Exams</div>
        <select
          name=""
          id=""
          className="w-[200px] ml-13  rounded-xl  px-3 py-1 bg-gray-500 text-white font-semibold text-xl"
          onChange={(e) => {
            showCategory(e.target.value);
            console.log("working", e.target.value);
          }}
        >
          <option>Select subject </option>
          {categories.map((cat, i) => {
            return (
              <option className="hover:bg-red-600" value={cat}>
                {cat}
              </option>
            );
          })}
        </select>
      </div>

      <div className="mt-6 px-20">
        {filteredQues.map((que, i) => {
          let Qid = que._id;
          return (
            <div className="w-full mb-6 rounded-3xl py-10 h-full bg-gray-600 px-10 ">
              <h1 className="text-3xl text-gray-200 font-semibold mb-3">
                <span>Q.{i + 1} </span> {que.question}
              </h1>
              <div className="ml-2 font-semibold my-2 text-md bg-teal-600 w-24 rounded-2xl text-center p-2">
                Marks :{" "}
                <span>
                  {" "}
                  {que.answer === attemptCat[0].selectedOptions[Qid]
                    ? "+4"
                    : attemptCat[0].selectedOptions?.[Qid]
                    ? "-1"
                    : "0"}
                </span>
              </div>
              <div className="flex text-white w-full gap-y-2 flex-col">
                {que.options.map((option, index) => (
                  <div
                    key={index}
                    className={` text-left text-xl m-1 w-full rounded-xl px-6 py-2 ${
                      option === que.answer
                        ? "bg-green-400 text-black"
                        : option === attemptCat[0].selectedOptions[Qid]
                        ? "bg-red-400 text-black"
                        : "bg-gray-400 text-gray-800"
                    }`}
                  >
                    {console.log(
                      `${option} ${attemptCat[0].selectedOptions[Qid]}`
                    )}
                    {option}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewExams;
