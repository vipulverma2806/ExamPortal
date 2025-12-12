import React, { useEffect, useState } from "react";
import TimePerQues from "../components/TimePerQues";
import RightWrongPie from "../components/RightWrongPie";
import TopicWiseBar from "../components/TopicWiseBar";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
const StudentSummary = () => {
  const {attemptArr} = useOutletContext();

  return (
    <>
      {attemptArr.length == 0 ? (
        <div>Loading</div>
      ) : (
        <div className=" overflow-auto  h-full">
          <TimePerQues attemptArr={attemptArr}></TimePerQues>
          <div className="flex">
            <RightWrongPie attemptArr={attemptArr}></RightWrongPie>
            <TopicWiseBar attemptArr={attemptArr}></TopicWiseBar>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentSummary;
