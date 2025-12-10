import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

const URL = import.meta.env.VITE_URL;

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);
const TimePerQues = () => {
  axios.defaults.withCredentials = true;
  const [chartData, setChartData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [allAttempts, setAllAttempts] = useState([]);
  //   const category = "AI";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/getStudentSummary`);
        const attemptsArr = res.data;
        setAllAttempts(attemptsArr);
        const categoriesArr = attemptsArr.map((attempt, i) => attempt.category);
        setCategories(categoriesArr);
        const attempt = attemptsArr[0];

        const timeSpents = Object.values(attempt.timeSpents);
        const QuesNo = Object.keys(attempt.selectedOptions);

        const formatted = {
          labels: QuesNo,

          datasets: [
            {
              label: "Total Bookings",
              data: timeSpents,

              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.3)",
              fill: true,
              tension: 0.4,
            },
          ],
        };
        setChartData(formatted);
        console.log();
      } catch (err) {
        console.log(err);
      }
      //   const timeSpents = Object.values(apiData.timeSpents);
      //   const QuesNo = Object.keys(apiData.timeSpents);
      //   console.log(apiData);
    };

    fetchData();
  }, []);

  const showCategory = (cat) => {
    setSelectCategory(cat)
    const attempt = allAttempts.filter(
      (attempt, i) => attempt.category === selectCategory
    );
    const timeSpents = Object.values(attempt[0].timeSpents);
    // const QuesNo = Object.keys(attempt[0].timeSpents);
    const QuesNo = [1,2,3,4,5,6,7]
    console.log();

    const formatted = {
      labels: QuesNo,

      datasets: [
        {
          label: "Total Bookings",
          data: [1,2,3,4,5,6,7,8],

          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.3)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
    setChartData(formatted);
  };

  return (
    <div>
      <h2 className="text-xl text-left text-white font-bold mb-1 pl-5 py-2">
        Time taken per Question
      </h2>
      <select name="" id="" className="w-[200px] bg-gray-700">
        {categories.map((cat, i) => {
          return (
            <option value={cat} onClick={()=>showCategory(cat) }>
              {cat}
            </option>
          );
        })}
      </select>
      <div className="w-full h-full px-5 py-3 bg-white rounded shadow-xl border">
        <h2 className="text-xl h-1/2 text-black font-bold mb-1 text-center">
          {}
        </h2>

        {chartData ? (
          <Line
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TimePerQues;
