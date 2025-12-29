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

const TopicWiseBar = ({ attemptArr }) => {
  const [Subjects, setSubjects] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  useEffect(() => {
    const SubjectsArr = attemptArr.map((attempt, i) => attempt.subject);
    const totalMarksArr = attemptArr.map((attempt, i) => attempt.totalMarks);
    setTotalMarks(totalMarksArr);
    setSubjects(SubjectsArr);
  }, []);

  const barData = {
    labels: Subjects, // X-axis labels
    datasets: [
      {
        label: "Final marks Subject wise",
        data: totalMarks, // Replace with your values
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(255, 206, 86, 0.6)", // Yellow
          "rgba(75, 192, 192, 0.6)", // Teal (your current color)
          "rgba(153, 102, 255, 0.6)", // Purple
          "rgba(255, 159, 64, 0.6)", // Orange
          "rgba(0, 128, 128, 0.6)", // Dark teal
          "rgba(0, 204, 102, 0.6)", // Green
          "rgba(102, 0, 204, 0.6)", // Deep violet
          "rgba(255, 51, 153, 0.6)", // Pink
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
        borderRadius: 6, // rounded bars
      },
    ],
  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14 },
          color: "#000",
        },
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
