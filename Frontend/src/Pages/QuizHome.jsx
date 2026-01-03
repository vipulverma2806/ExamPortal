import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
const QuizHome = () => {
  const [Subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await axios.get(`${URL}/userRoutes/Subjects`);
      setSubjects(res.data);
    };

    fetchSubjects();
  }, [navigate]);

  const handlesubjectClick = (subject) => {
    navigate(`/quiz/${subject}`);
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 bg-gray-800 flex justify-center items-center ">
        <div className="bg-gray-900/80 border mt-20 p-10 max-w-3xl w-[90%] border-gray-700/40 shadow-2xl text-center rounded-3xl">
          <h1 className=" text-4xl font-bold mb-12">
            <span className="text-white">Choose your</span>
            <span className="text-blue-500"> Quiz subject</span>
          </h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3  items-center justify-center gap-x-5 gap-y-5 m-5">
            {Subjects.map((subject) => (
              <div
                key={subject}
                className="px-5 h-20 py-2 text-xl hover:bg-blue-800 font-semibold rounded-2xl flex justify-center items-center bg-gray-800 text-white cursor-pointer "
                onClick={() => handlesubjectClick(subject)}
              >
                <h2 className="">{subject}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizHome;
