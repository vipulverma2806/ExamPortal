import React, { useState, useEffect } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
axios.defaults.withCredentials = true;
const LeaderBoard = () => {
  const [leaderArray, setLeaderArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/getLeaderBoard`);
        setLeaderArray(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="grid  text-2xl font-bold text-center bg-teal-700 mb-3 rounded-xl   border-2 border-gray-300  py-2 grid-cols-3">
        <span className="">Rank</span><span>Name</span><span>Marks</span>
      </div>
      {leaderArray.map((student, i) => {
        return (
          <div className="grid text-center bg-gray-600 mb-3 rounded-3xl py-2 grid-cols-3">
            <span className="text-4xl ">
              {i == 0 && "🥇"}
              {i == 1 && "🥈"}
              {i == 2 && "🥉"}
              {i > 2 && `${i + 1}.`}
            </span>
            <span className="text-2xl ">{student.name}</span>
            <span className="text-2xl">{student.finalMarks}</span>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderBoard;

{
  /* <span className="text-3xl">🥇</span>
🥈🥉 */
}
