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
      {leaderArray.map((student, i) => {
        return <div>
          <span>{i==0 && "🥇"}{i==1 && "🥈"}{i==2 && "🥇"}</span><span></span><span></span>
        </div>
        
      })}
    </div>
  );
};

export default LeaderBoard;

{
  /* <span className="text-3xl">🥇</span>
🥈🥉 */
}
