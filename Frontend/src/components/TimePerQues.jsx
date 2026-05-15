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
  Filler,
);
const TimePerQues = ({ allAttempts }) => {
  axios.defaults.withCredentials = true;
  const attemptArr = allAttempts;
  const [chartData, setChartData] = useState(null);
  const [Subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    let SubjectsArr;
    const fetchData = async () => {
      // console.log("timeperQues 36",allAttempts)
      if (!attemptArr || attemptArr.length == 0) return;
      try {
        SubjectsArr = attemptArr.map((attempt, i) => attempt.subject);
        // console.log("timeperque 41",SubjectsArr)
        setSubjects(SubjectsArr);
        if (attemptArr.length == 0) return;
        const attempt = attemptArr[0];
        setSelectedSubject(attempt.subject);
        // console.log(attemptArr);
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
    // console.log(SubjectsArr)
    if (SubjectsArr?.length) showsubject(SubjectsArr[0]);
  }, [attemptArr]);

  const showsubject = (cat) => {
    const attempt = attemptArr.find((attempt) => attempt.subject === cat);
    if (!attempt) return;
    // console.log("timeperque 81", attempt);
    const timeSpents = Object.values(attempt.time_spents);
    const QuesNo = Object.keys(attempt.time_spents);

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
    setSelectedSubject(cat);
    // console.log("chardata", cat, chartData);
  };

  return (
    <div className="h-[500px] mr-5 shadow-xl border rounded-2xl bg-white ">
      <select
        name=""
        id=""
        value={selectedSubject}
        className="w-auto ml-10 mt-5 rounded-xl relative top-1 left-8 z-40 px-3 py-1 bg-gray-500 text-white font-semibold text-lg"
        onChange={(e) => {
          showsubject(e.target.value);
        }}
      >
        <option value="" disabled selected hidden>
          Select Subject
        </option>
        {Subjects.map((cat, i) => {
          return (
            <option className="hover:bg-red-600" value={cat} key={i}>
              {cat}
            </option>
          );
        })}
      </select>
      <div className="w-full h-full relative z-10 bottom-15 px-5 pt-10 flex justify-center items-center   ">
        {chartData ? (
          <Line
            className="bg-white p-3  "
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

              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: "black",
                    stepSize: 1,

                    font: {
                      size: 13,
                      weight: "bold",
                    },
                  },
                  title: {
                    display: true,
                    text: "time in minutes",
                    color: "black",
                    font: {
                      size: 18,
                      weight: "bold",
                    },
                  },
                  grid: {
                    color: "rgba(0,0,0,0.2)",
                  },
                },
                x: {
                  ticks: {
                    color: "black",
                    stepSize: 1,
                    font: {
                      size: 13,
                      weight: "bold",
                    },
                  },
                  title: {
                    display: true,
                    text: "Question Numbers",
                    color: "black",
                    font: {
                      size: 18,
                      weight: "bold",
                    },
                  },
                  grid: {
                    color: "rgba(0,0,0,0.2)",
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
