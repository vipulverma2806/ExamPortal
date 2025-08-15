import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchCategories = async () => {
      const res = await axios.get('http://localhost:5000/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(res.data);
    };

    fetchCategories();
  }, [token, navigate]);

  const handleCategoryClick = (category) => {
    navigate(`/quiz/${category}`);
  };

  return (
    <div className="w-full flex-1 bg-gray-800 flex flex-col justify-center items-center">
      <div className='bg-gray-700 flex justify-center items-center text-gray-200 p-5 border-gray-300 border-2 flex-col rounded-2xl'>
      
      <h1 className=" text-4xl font-bold  italic m-5">Choose your Quiz Category</h1>
      
      <div className="flex flex-wrap w-3xl items-center justify-center gap-x-5 gap-y-5 m-5">
        {categories.map((category) => (
          <div key={category} className="p-2 text-xl hover:bg-blue-800 font-semibold rounded-2xl w-25 flex justify-center items-center bg-blue-600 cursor-pointer " onClick={() => handleCategoryClick(category)}>
            <h2 className="">{category}</h2>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
