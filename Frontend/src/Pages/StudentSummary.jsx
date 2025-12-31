import React, { useEffect, useState } from "react";
import TimePerQues from "../components/TimePerQues";
import RightWrongPie from "../components/RightWrongPie";
import TopicWiseBar from "../components/TopicWiseBar";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
const StudentSummary = ({ currentStudentAttempts }) => {
  const { attemptArr } = useOutletContext();
  const [allAttempts, setAllAttempts] = useState([]);
  console.log("attemptsArr",attemptArr)

  useEffect(() => {
    if (attemptArr.length > 0) {
      setAllAttempts(attemptArr);
      console.log("under If");
    } else {
      console.log(currentStudentAttempts)
      setAllAttempts(currentStudentAttempts);
      console.log("under Else");
    }
  }, [allAttempts]);
  // console.log("allAttempts studentSummary",allAttempts)
  return (
    <>
      {allAttempts?.length == 0 ? (
        <div className="text-center mt-50">Data Not Available</div>
      ) : (
        <div className=" overflow-auto  h-full">
          <TimePerQues allAttempts={allAttempts}></TimePerQues>
          <div className="flex">
            <RightWrongPie allAttempts={allAttempts}></RightWrongPie>
            <TopicWiseBar allAttempts={allAttempts}></TopicWiseBar>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentSummary;
