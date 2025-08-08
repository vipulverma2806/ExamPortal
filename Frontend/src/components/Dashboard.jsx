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
      const res = await axios.get('http://localhost:5000/categories', {
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
    <div className="dashboard">
      <h1 className="title">Quiz Categories</h1>
      <div className="category-grid">
        {categories.map((category) => (
          <div key={category} className="category-card" onClick={() => handleCategoryClick(category)}>
            <h2 className="category-name">{category}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
