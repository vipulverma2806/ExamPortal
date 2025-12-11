import React from "react";
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
const [categories,set]

  const categoriesArr = attemptArr.map((attempt, i) => attempt.category);
  setCategories(categoriesArr);
  const barData = {
    labels: ["Q1", "Q2", "Q3", "Q4"], // X-axis labels
    datasets: [
      {
        label: "Scores",
        data: [12, 19, 7, 15], // Replace with your values
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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
          color: "#000",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 14 },
          color: "#000",
          stepSize: 5,
        },
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
      },
    },
  };

  return (
    <div className="w-2/3 h-[350px]">
      <Bar data={barData} options={barOptions} />
    </div>
  );
};

export default TopicWiseBar;
