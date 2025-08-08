import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/progress', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data); // Debug: Log the response data
        setProgress(res.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="user-dashboard">
      <h1>Your Quiz Progress</h1>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Correct Answers</th>
            <th>Wrong Answers</th>
            <th>Progress (%)</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((item) => (
            <tr key={item._id}>
              <td>{item.category}</td>
              <td>{item.correctAnswers}</td>
              <td>{item.wrongAnswers}</td>
              <td>{((item.correctAnswers / (item.correctAnswers + item.wrongAnswers)) * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
