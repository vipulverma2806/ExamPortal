import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

import axios from 'axios';

const Dashboard2 = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
 axios.defaults.withCredentials =true;

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    };

    fetchCategories();
    
  }, [navigate]);

  const handleCategoryClick = (category) => {
    navigate(`/quiz/${category}`);
  };

  return (
    
    <>
  <Navbar />

  <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center px-4">

    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/40 shadow-2xl rounded-3xl p-10 max-w-3xl w-full text-center">

      <h1 className="text-4xl font-bold text-gray-100 mb-8 tracking-wide">
        Choose Your <span className="text-blue-400">Quiz Category</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

        {categories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="
              cursor-pointer select-none px-6 py-5 
              rounded-2xl bg-gray-800/70 border border-gray-700
              hover:bg-blue-600 hover:border-blue-400 hover:shadow-2xl
              transition-all duration-300 ease-in-out transform hover:scale-[1.05]
              text-gray-200 font-semibold text-xl flex justify-center items-center
            "
          >
            {category}
          </div>
        ))}

      </div>
    </div>

  </div>
</>

  );
};

export default Dashboard2;
