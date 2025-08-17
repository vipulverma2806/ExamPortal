import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  axios.defaults.withCredentials = true;
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/progress");
        console.log(res.data); // Debug: Log the response data
        setProgress(res.data);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <><Navbar />
    <div className="flex flex-1 pt-10 bg-gray-800 text-gray-200 items-center  flex-col">
      <div className="items-center justify-center flex flex-col">
        <h1 className="text-5xl font-bold m-6">Your Quiz Progress</h1>
        <div className="rounded-xl">
          <table className="bg-gray-700  rounded-xl w-5xl">
            <thead className="bg-blue-800 rounded-xl ">
              <tr className="border-b-2" >
                <th className="p-3 rounded-tl-xl ">Category</th>
                <th>Correct Answers</th>
                <th>Wrong Answers</th>
                <th className="rounded-tr-xl">Progress (%)</th>
              </tr>
            </thead>
            <tbody>
              {progress.map((item) => (
                <tr className="border-b-2" key={item._id}>
                  <td className="p-2 text-center">{item.category}</td>
                  <td className="p-2 text-center">{item.correctAnswers}</td>
                  <td className="p-2 text-center">{item.wrongAnswers}</td>
                  <td className="p-2 text-center">
                    {item.correctAnswers === 0 ? '0' : (
                      (item.correctAnswers /
                        (item.correctAnswers + item.wrongAnswers)) *
                      100
                    ).toFixed(2)}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserDashboard;
