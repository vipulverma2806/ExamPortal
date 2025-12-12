import React, { useEffect, useState } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend , Title);

const RightWrongPie = ({attemptArr}) => {
  const [rightAns, setRightAns] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get(`${URL}/api/getStudentSummary`);
        // const attemptsArr = res.data;
        let right = 0;
        let wrong = 0;
        for (const attempt of attemptArr) {
          right = right + attempt.rightAnswers;
          wrong = wrong + attempt.wrongAnswers;
        }
        setRightAns(right);
        setWrongAns(wrong);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // console.log(rightAns, wrongAns);

  const pieData = {
    labels: ["Right Answers", "Wrong Answerss"],
    datasets: [
      {
        // label: "Combined Exam Stats",
        data: [rightAns, wrongAns],
        backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(255, 99, 132, 0.7)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 16, },
          color : "black",
        },
        
      },
      title: {
        display: true,
        text: "Performance Breakdown",
        font: { size:20, weight: "bold" },
        color: "black",
        padding: 10,
        
      },
    },
  };

  return (
    <div className="w-1/3  bg-white p-1 my-4 rounded-2xl">
      <Pie data={pieData} options={pieOptions}  />
    </div>
  );
};

export default RightWrongPie;
