import React, { useEffect, useState } from "react";
import TimePerQues from "../components/TimePerQues";
import RightWrongPie from "../components/RightWrongPie";
import TopicWiseBar from "../components/TopicWiseBar";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
const StudentSummary = ({ currentStudentAttempts }) => {
  const { attemptArr } = useOutletContext();
  const [allAttempts, setAllAttempts] = useState([]);
  console.log("attemptsArr", attemptArr);
  console.log("currentSA", currentStudentAttempts);

  useEffect(() => {
    if (attemptArr.length > 0) {
      setAllAttempts(attemptArr);
      // console.log("under If");
    } else {
      console.log(currentStudentAttempts);
      setAllAttempts(currentStudentAttempts);
      // console.log("under Else");
    }
  }, [allAttempts]);
  // console.log("allAttempts studentSummary",allAttempts)
  return (
    <>
      {/* {console.log("studentsummarry 25", allAttempts)} */}
      {allAttempts?.length ? (
        <div className="h-full">
          <div className="">
            <TimePerQues allAttempts={allAttempts}></TimePerQues>
          </div>

          <div className="flex h-1/2">
            <RightWrongPie allAttempts={allAttempts}></RightWrongPie>
            <TopicWiseBar allAttempts={allAttempts}></TopicWiseBar>
          </div>
        </div>
      ) : (
        <div className="text-center mt-50 ">
          <p className="block  text-2xl">Data Not Available</p>

          <button className=" h-20">
            <NavLink
              to="/quizHome"
              className={` m-10 
                p-2 text-center rounded-md
                     text-white bg-green-600 hover:bg-green-800
                     `}
            >
              Give Your First Exam here
            </NavLink>
          </button>
        </div>
      )}
    </>
  );
};

export default StudentSummary;
