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
const TimePerQues = ({attemptArr}) => {
  axios.defaults.withCredentials = true;
  const [chartData, setChartData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [allAttempts, setAllAttempts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {

      try {
      
        const categoriesArr = attemptArr.map((attempt, i) => attempt.category);
        setCategories(categoriesArr);
        const attempt = attemptArr[0];
        console.log(attemptArr)
        const timeSpents = Object.values(attempt.timeSpents);
        const QuesNo = Object.keys(attempt.timeSpents);
    
        const formatted = {
          labels: QuesNo,

          datasets: [
            {
              label: "Time Taken per Question",
              data: timeSpents,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.3)",
              fill: true,
              tension: 0.4,
            },
          ],
        };
        setChartData(formatted);
      } catch (err) {
        console.log(err);
      }
    
    };

    fetchData();
  }, []);

  const showCategory = (cat) => {
    const attempt = attemptArr.filter(
      (attempt, i) => attempt.category === cat
    );
    console.log(attempt);
    const timeSpents = Object.values(attempt[0].timeSpents);
    const QuesNo = Object.keys(attempt[0].timeSpents);
   

    const formatted = {
      labels: QuesNo,

      datasets: [
        {
          label: "Time Taken per Question",
          data: timeSpents,

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
    <div className="h-full py-1  rounded-2xl bg-gray-600 ">
      <select
        name=""
        id=""
        className="w-[200px] ml-10 mt-5 rounded-xl relative top-3 z-40 px-3 py-1 bg-gray-500 text-white font-semibold text-xl"
        onChange={(e) => {
          showCategory(e.target.value);
          console.log("working", e.target.value);
        }}
      >
        {categories.map((cat, i) => {
          return <option className="hover:bg-red-600" value={cat}>{cat}</option>;
        })}
      </select>
      <div className="w-full h-full relative z-10 bottom-15 px-5 py-5 flex justify-center items-center   ">
        {chartData ? (
          <Line
            className="bg-white p-3  rounded-xl  shadow-xl border"
            data={chartData}
            options={{
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 18,
                      weight: "bold",
                    },
                  },
                },
                
              },

              maintainAspectRatio:false,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                    font: {
                      size: 13,
                    },
                  },
                  title: {
                    display: true,
                    text: "time in seconds",
                    font: {
                      size: 18,
                      weight: "bold",
                    },
                  },
                },
                x: {
                  ticks: {
                    stepSize: 1,
                    font: {
                      size: 13,
                    },
                  },
                  title: {
                    display: true,
                    text: "Question Numbers",
                    font: {
                      size: 18,
                      weight: "bold",
                    },
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
