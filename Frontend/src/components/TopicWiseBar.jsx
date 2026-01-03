import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const TopicWiseBar = ({ allAttempts }) => {
  const [Subjects, setSubjects] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  console.log("allAttempts", allAttempts);
  const attemptArr = allAttempts;
  console.log("attemptarr", attemptArr);
  const SubjectsArr = attemptArr?.map((attempt, i) => attempt.subject);
  const totalMarksArr = attemptArr?.map((attempt, i) => attempt.totalMarks);
  useEffect(() => {
    setTotalMarks(totalMarksArr);
    setSubjects(SubjectsArr);
  }, []);

  const barData = {
    labels: Subjects,
    datasets: [
      {
        data: totalMarks,
        
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", 
          "rgba(54, 162, 235, 0.6)", 
          "rgba(255, 206, 86, 0.6)", 
          "rgba(75, 192, 192, 0.6)", 
          "rgba(153, 102, 255, 0.6)", 
          "rgba(255, 159, 64, 0.6)", 
          "rgba(0, 128, 128, 0.6)", 
          "rgba(0, 204, 102, 0.6)", 
          "rgba(102, 0, 204, 0.6)", 
          "rgba(255, 51, 153, 0.6)", 
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(0, 128, 128, 1)",
          "rgba(0, 204, 102, 1)",
          "rgba(102, 0, 204, 1)",
          "rgba(255, 51, 153, 1)",
        ],
        borderWidth: 2,
        borderRadius: 6, 
      },
    ],
  };
  const barOptions = {
    responsive: true,
      indexAxis: "y",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Performance Bar Chart",
        font: { size: 20, weight: "bold" },
        color: "#000",
        padding: 20,
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 14 },
          color: "black",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 14 },
          color: "black",
          stepSize: 5,
        },
        grid: {
          color: "rgba(0,0,0,0.3)",
        },
      },
    },
  };

  return (
    <div className="w-2/3 bg-white m-5 p-3 rounded-2xl  h-[350px]">
      <Bar data={barData} options={barOptions} />
    </div>
  );
};

export default TopicWiseBar;
