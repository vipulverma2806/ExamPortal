import React, { useState, useEffect } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
axios.defaults.withCredentials = true;
const LeaderBoard = () => {
  const [leaderArray, setLeaderArray] = useState([]);
  const [topperArray, setTopperArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/userRoutes/getLeaderBoard`);
        
        setLeaderArray(res.data.data.slice(3));
        setTopperArray(res.data.data.slice(0, 3));
       
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 md:p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          🏆 Leaderboard
        </h1>
        <p className="text-gray-300">Top performers of the competition</p>
      </div>

      {/* Podium Section */}
      <div className="flex flex-col md:flex-row justify-center  items-end gap-4 md:gap-8 mb-12">
        {/* 2nd Place */}
        <div className="order-2 md:order-1 md:mt-12  ">
          <div className="text-center ">
            <div className="relative mb-3">
              <div className="text-5xl md:text-6xl mb-2">🥈</div>
              <div className="absolute -top-2 right-13 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                2ND
              </div>
            </div>
            <div className="bg-gradient-to-r w-[210px] from-slate-700 to-slate-800 rounded-xl p-4 shadow-lg border border-slate-600">
              <p className="text-lg font-semibold text-white truncate">
                {topperArray[1]?.name || "Participant"}
              </p>
              <p className="text-2xl font-bold text-amber-300 mt-1">
                {topperArray[1]?.finalMarks || "0"}
              </p>
              <div className="mt-4 h-32 bg-gradient-to-b from-slate-500 to-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Silver</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1st Place */}
        <div className="order-1 md:order-2 transform  ">
          <div className="text-center">
            <div className="relative mb-3">
              <div className="text-6xl md:text-7xl mb-3">🥇</div>
              <div className="absolute -top-2 right-6 bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                WINNER
              </div>
            </div>
            <div className="bg-gradient-to-r w-[210px] from-yellow-600 to-yellow-700 rounded-xl p-5 shadow-2xl border border-yellow-500">
              <p className="text-xl font-bold text-white truncate">
                {topperArray[0]?.name || "Champion"}
              </p>
              <p className="text-3xl font-bold text-white mt-2">
                {topperArray[0]?.finalMarks || "0"}
              </p>
              <div className="mt-6 h-48 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xl">Gold</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="order-3 md:order-3 md:mt-16 ">
          <div className="text-center">
            <div className="relative mb-3">
              <div className="text-5xl md:text-6xl mb-2">🥉</div>
              <div className="absolute -top-2 right-13 bg-amber-800 text-white text-xs font-bold px-2 py-1 rounded-full">
                3RD
              </div>
            </div>
            <div className="bg-gradient-to-r w-[210px] from-amber-800 to-amber-900 rounded-xl p-4 shadow-lg border border-amber-700">
              <p className="text-lg font-semibold text-white truncate">
                {topperArray[2]?.name || "Participant"}
              </p>
              <p className="text-2xl font-bold text-amber-200 mt-1">
                {topperArray[2]?.finalMarks || "0"}
              </p>
              <div className="mt-4 h-28 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Bronze</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of Participants Table */}
      <div className="max-w-4xl mx-auto">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-xl shadow-lg p-4 mb-4">
          <div className="col-span-1 text-center">
            <span className="text-lg font-bold">#</span>
          </div>
          <div className="col-span-7 md:col-span-8 bg-red-">
            <span className="text-lg font-bold pl-8">Name</span>
          </div>
          <div className="col-span-4 md:col-span-3 text-center">
            <span className="text-lg font-bold">Marks</span>
          </div>
        </div>

        {/* Participants List */}
        {leaderArray.length > 0 ? (
          <div className="space-y-3">
            {leaderArray.map((student, i) => {
              const rank = i + 4;
              const isTop10 = rank <= 10;

              return (
                <div
                  key={i}
                  className={`grid grid-cols-12 items-center rounded-2xl p-4 shadow-md   ${
                    isTop10
                      ? "bg-gradient-to-r from-gray-800 to-gray-900 border-l-4 border-cyan-500"
                      : "bg-gradient-to-r from-gray-700 to-gray-800"
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-1 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                        isTop10
                          ? "bg-cyan-600 text-white font-bold"
                          : "bg-gray-600 text-gray-200"
                      }`}
                    >
                      {rank}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="col-span-7 md:col-span-8 pl-4">
                    <div className="flex items-center">
                      <p className="text-lg text-white font-medium truncate">
                        {student.name}
                      </p>
                      
                    </div>
                  </div>

                  {/* Marks */}
                  <div className="col-span-4 md:col-span-3 text-center">
                    <div className="flex items-center justify-center">
                      <span className="text-2xl font-bold text-white mr-2">
                        {student.finalMarks}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">No other participants yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

//   return (
//     <div>
//       <div className="flex justify-center items-end-safe">
//         {console.log(topperArray[1]?.name)}
//         <div className="text-center">
//           <p className="text-6xl bg-amber-500 ">🥈</p>
//           <p className="mt ">{topperArray[1]?.name}</p>
//           <p className=" ">{topperArray[1]?.finalMarks}</p>
//           <div className="w-[200px] h-[100px] bg-green-500 text-center">
//             2nd
//           </div>
//         </div>
//         <div className="text-center">
//           <p className="text-6xl bg-amber-500 ">🥇</p>
//           <p className="mt ">{topperArray[0]?.name}</p>
//           <p className=" ">{topperArray[0]?.finalMarks}</p>
//           <div className="w-[200px] h-[200px] bg-green-500 text-center">
//             1st
//           </div>
//         </div>
//         <div className="text-center">
//           <p className="text-6xl bg-amber-500 ">🥉</p>
//           <p className="mt ">{topperArray[2]?.name}</p>
//           <p className=" ">{topperArray[2]?.finalMarks}</p>
//           <div className="w-[200px] h-[100px] bg-green-500 text-center">
//             3rd
//           </div>
//         </div>
//       </div>

//       <div className="grid  text-2xl font-bold text-center bg-teal-700 mb-3 rounded-xl   border-2 border-gray-300  py-2 grid-cols-3">
//         <span className="">Rank</span>
//         <span>Name</span>
//         <span>Marks</span>
//       </div>

//       {leaderArray.map((student, i) => {
//         return (
//           <div className="grid text-center bg-gray-600 mb-3 rounded-3xl py-2 grid-cols-3">
//             <span className="text-4xl ">{i + 4}</span>
//             <span className="text-2xl ">{student.name}</span>
//             <span className="text-2xl">{student.finalMarks}</span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

export default LeaderBoard;
