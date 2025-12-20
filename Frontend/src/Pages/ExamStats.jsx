import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);
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
const ExamStats = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [allAttempts, setAllAttempts] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [bestWorstSub, setBestWorstSub] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [studentCount, setStudentCount] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [chosenSubject, setChosenSubject] = useState([]);
  const studentsFromStore = useSelector((state) => state.adminData.allStudents);
  const attemptsFromStore = useSelector((state) => state.adminData.allAttempts);
  const questionsFromStore = useSelector(
    (state) => state.adminData.allQuestions
  );
  const bestWorstFromStore = useSelector(
    (state) => state.adminData.bestWorstSub
  );
  const bestWorstArray = [...bestWorstFromStore];
  // console.log(attemptsFromStore);
  // console.log(studentsFromStore)
  useEffect(() => {
    setAllStudents(studentsFromStore);
    setAllAttempts(attemptsFromStore);
    bestWorstArray.sort((a, b) => b.count - a.count);
    setBestWorstSub(bestWorstArray);
  }, [studentsFromStore]);

  useEffect(() => {
    const getSubjects = () => {
      let sub = attemptsFromStore.map((sub, i) => {
        return sub.category;
      });
      sub = [...new Set(sub)];
      setSubjects(sub);
    };
    getSubjects();
  }, [attemptsFromStore]);
  // console.log(subjects);
  const cards = [
    {
      title: "Total Students",
      value: allStudents?.length,
    },
    {
      title: "Total Attempts",
      value: allAttempts?.length,
    },
    {
      title: "Best Subject",
      info: bestWorstSub[0]?.count,
      value: bestWorstSub[0]?.subject,
    },
    {
      title: "Worst Subject",
      info: bestWorstSub[bestWorstSub.length - 1]?.count,
      value: bestWorstSub[bestWorstSub.length - 1]?.subject,
    },
  ];

  //---function-------------------
  useEffect(() => {
    const showChart = (sub) => {
      if (!allAttempts.length || !sub) return;
      // setAvg([]);
      let allAvg = [];

      const filteredAttempt = allAttempts.filter(
        (att, i) => att.category == sub
      );
      setStudentCount(filteredAttempt.length);
      // console.log("filtr",filteredAttempt)
      const QuesCount = Object.keys(filteredAttempt[0].timeSpents).length;
      const QuesNo = Object.keys(filteredAttempt[0].timeSpents);
      console.log("QuesNo", QuesNo);
      for (let i = 0; i < QuesCount; i++) {
        const Q = filteredAttempt.map((att) => {
          return Object.values(att.timeSpents)[i];
        });
        // console.log("ye rha Q",Q)
        let avg = [];
        avg = Q.reduce((acc, curr) => acc + curr, 0) / Q.length;
        // setAvg((prev) => [...prev, avg]);
        allAvg.push(avg);
      }
      console.log();
      const formatted = {
        labels: QuesNo,
        // labels: ['a', 'b', 'c', 'd', 'e', 'f'],

        datasets: [
          {
            label: "Avg Time Taken per Question",
            data: allAvg,
            // data: [1, 2, 3, 4, 5, 6],

            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.3)",
            fill: true,
            tension: 0.4,
          },
        ],
      };
      setChartData(formatted);
      console.log("chardata", chartData);
    };

    showChart(chosenSubject);
  }, [chosenSubject]);

  // console.log("avg ye rha   ", avg);
  return (
    <div className=" w-full p-3">
      <div className="w-full  grid grid-cols-1 font-bold sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl bg-gray-700  p-6 shadow-2xs shadow-white"
          >
            <h3 className="text-md text-white ">{card.title}</h3>

            <p className="mt-3 text-4xl font-bold text-black dark:text-white">
              {card.value}
            </p>

            <p className="mt-2 text-md text-green-500">{card.info}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex justify-between items-center pr-3">
          <select
            name=""
            id=""
            onChange={(e) => {
              setChosenSubject(e.target.value);
              console.log("working", e.target.value);
            }}
            className="bg-gray-800 rounded-xl mr-5 mt-5  py-2 border border-gray-400 my-3 px-4 w-60 shadow-2xs shadow-white"
          >
            <option>Select Subject</option>
            {subjects.map((subject, i) => {
              return (
                <option key={i} value={subject}>
                  {subject}
                </option>
              );
            })}
          </select>
          {studentCount ? (
            <span className="font-semibold text-xl">
              Students Appeard in this subject :<span className="ml-2 ">{studentCount}</span>{" "}
            </span>
          ) : null}
        </div>



        {/* Avg time per question area chart */}
        <div className="w-full h-[400px]  bottom-15  pt-1 flex justify-center items-center   ">
          {console.log("jsx chardata", chartData)}
          {chartData ? (
            <Line
              key={chosenSubject}
              className="bg-white w-full p-3 rounded-4xl "
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
                      stepSize: 0.1,

                      font: {
                        size: 13,
                        weight: "bold",
                      },
                    },
                    title: {
                      display: true,
                      text: "time in seconds",
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
        



        {/* right - wrong - unattempt per question */}

        
      </div>
    </div>
  );
};

export default ExamStats;
