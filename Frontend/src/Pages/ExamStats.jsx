import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler
);
const ExamStats = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [allAttempts, setAllAttempts] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [bestWorstSub, setBestWorstSub] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [barPerformanceData, setBarPerformanceData] = useState(null);
  const [stackedChartData, setStackedChartData] = useState(null);
  const [studentCount, setStudentCount] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [chosenSubject, setChosenSubject] = useState([]);

  const studentsFromStore = useSelector(
    (state) => state.adminData?.allStudents
  );
  const attemptsFromStore = useSelector(
    (state) => state.adminData?.allAttempts
  );
  const questionsFromStore = useSelector(
    (state) => state.adminData?.allQuestions
  );
  const bestWorstFromStore = useSelector(
    (state) => state.adminData?.bestWorstSub
  );
  const bestWorstArray = [...bestWorstFromStore];
  // console.log(attemptsFromStore);
  // console.log(studentsFromStore)
  useEffect(() => {
    if (
      studentsFromStore.length === 0 ||
      attemptsFromStore.length === 0 ||
      attemptsFromStore.length === 0
    ) {
      console.log("Complete Data not available ");
      return;
    }
    setAllStudents(studentsFromStore);
    setAllAttempts(attemptsFromStore);
    setAllQuestions(questionsFromStore);
    bestWorstArray.sort((a, b) => b.count - a.count);
    setBestWorstSub(bestWorstArray);
  }, [studentsFromStore]);

  useEffect(() => {
    const getSubjects = () => {
      // console.log("attempt from store",attemptsFromStore)
      if (attemptsFromStore.length === 0) {
        console.log("no data available for selected subject");
        return;
      }

      let sub = attemptsFromStore.map((sub, i) => {
        return sub.subject;
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

  //---function  avg time per question-------------------
  useEffect(() => {
    const showChart = (sub) => {
      if (!allAttempts.length || !sub) return;
     
      let allAvg = [];

      const filteredAttempt = allAttempts.filter(
        (att, i) => att.subject == sub
      );
      if (filteredAttempt.length === 0) {
        console.log("no data available for selected subject");
        return;
      }
      setStudentCount(filteredAttempt.length);
      // console.log("filtr",filteredAttempt)
      const QuesCount = Object.keys(filteredAttempt[0].timeSpents).length;
      const QuesNo = Object.keys(filteredAttempt[0].timeSpents);
      // console.log("QuesNo", QuesNo);

      for (let i = 0; i < QuesCount; i++) {
        const Q = filteredAttempt.map((att) => {
          return Object.values(att.timeSpents)[i];
        });
        // console.log("ye rha Q",Q)
        let avg = [];
        avg = Q.reduce((acc, curr) => acc + curr, 0) / Q.length;
     
        allAvg.push(avg);
      }

      const formatted = {
        labels: QuesNo,
        // labels: ['a', 'b', 'c', 'd', 'e', 'f'],

        datasets: [
          {
            label: "Avg Time Taken per Question",
            data: allAvg,
            

            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.3)",
            fill: true,
            tension: 0.4,
          },
        ],
      };
      setChartData(formatted);
      // console.log("chardata", chartData);
    };

    showChart(chosenSubject);
  }, [chosenSubject]);
  //---function  avg time per question-|^|^|^------------------

  //---function  right wrong not-attempted stacked chart per questio
  useEffect(() => {
    const showChart = (sub) => {
      if (!allAttempts.length || !sub) return;
      
      let allAvg = [];

      const filteredAttempt = allAttempts.filter(
        (att, i) => att.subject == sub
      );

      const filteredQuestion = allQuestions.filter(
        (que, i) => que.subject == sub
      );

      let QuesIdsAns = {};
      filteredQuestion.forEach((queObj) => {
        QuesIdsAns = { ...QuesIdsAns, [queObj._id]: queObj.answer };
      });
      // const QuesIdsArr = filteredQuestion.map((q) => q._id)
      // console.log("filtr",filteredAttempt)
      // const QuesCount = Object.keys(filteredAttempt[0].timeSpents).length;
      const QuesNo = Object.keys(filteredAttempt[0]?.timeSpents);
      let rightCounts = [];
      let wrongCounts = [];
      let skippedCounts = [];

      for (const key in QuesIdsAns) {
        const selectedAnsArr = filteredAttempt.map(
          (att) => att.selectedOptions?.[key]
        );
        let rightCount = 0;
        let wrongCount = 0;
        let skippedCount = 0;
        // console.log("selectedansarr",selectedAnsArr)
        // console.log("questionIdAns",QuesIdsAns)
        selectedAnsArr.forEach((ans) => {
          // console.log("quesidans", QuesIdsAns[key], ans);
          if (ans === QuesIdsAns[key]) {
            rightCount++;
            return;
          }
          if (ans === null) {
            skippedCount++;
            return;
          }
          if (ans !== QuesIdsAns[key]) {
            wrongCount++;
            return;
          }
        });
        rightCounts.push(rightCount);
        wrongCounts.push(wrongCount);
        skippedCounts.push(skippedCount);
      }
      // setRightCountArr(rightCounts);
      // setWrongCountArr(wrongCounts);
      // setSkippedCountArr(skippedCounts);
      console.log(
        "right",
        rightCounts,
        "wrong",
        wrongCounts,
        "skippedCounts",
        skippedCounts
      );
      const formatted = {
        labels: QuesNo,
        datasets: [
          {
            label: "Correct",
            data: rightCounts,
            backgroundColor: "#22c55e",
            stack: "stack1",
          },
          {
            label: "Wrong",
            data: wrongCounts,
            backgroundColor: "#ef4444",
            stack: "stack1",
          },
          {
            label: "Skipped",
            data: skippedCounts,
            backgroundColor: "#facc15",
            stack: "stack1",
          },
        ],
      };

      setStackedChartData(formatted);
      // console.log("chardata", chartData);
    };

    showChart(chosenSubject);
  }, [chosenSubject]);
  //---function  right wrong not attempted stacked chart per question-------------------

  useEffect(() => {
    const showPieChart = (sub) => {
      if (allAttempts.length === 0 || !sub) return;
      let pass = 0;
      let fail = 0;
      const filteredAttempt = allAttempts.filter(
        (attempt) => attempt.subject === sub
      );

      const QuesCount = Object.keys(filteredAttempt[0].selectedOptions).length;
      const totalmarks = QuesCount * 4;
      const passingMarks = (totalmarks * 33) / 100;
      filteredAttempt.forEach((attempt) => {
        if (passingMarks <= attempt.totalMarks) {
          pass++;
        } else {
          fail++;
        }
      });
      const pieData = {
        labels: ["Pass", "Fail"],
        
        datasets: [
          {
            label: "Result Breakdown",
            data: [pass, fail,],
            
            backgroundColor: ["#22c55e", "#ef4444", "#facc15"],
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      };
      setPieData(pieData);
    };
    showPieChart(chosenSubject);
  }, [chosenSubject]);

  useEffect(() => {
    const showBarChart = (sub) => {
      if (allAttempts.length === 0 || !sub) return;

      const filteredAttempt = allAttempts.filter(
        (attempt) => attempt.subject === sub
      );
      filteredAttempt.sort((a, b) => b.totalMarks - a.totalMarks);

      const top5students = filteredAttempt.slice(0, 5);
      const topperfullNames = top5students.map((attempt) => attempt.name);
      const toppersFirstNames = topperfullNames.map(
        (name) => name.split(" ")[0]
      );
      const topperMarks = top5students.map((attempt) => attempt.totalMarks);
      const barData = {
        labels: toppersFirstNames,
        labels:["Vipul","Virat","Rohit","Shikhar","M.S.Dhoni"],
        datasets: [
          {
            data: topperMarks,
            data:[67,53,47,45,40],
            backgroundColor: [
              "#3b82f6",
              "#FF4F4F",
              "#FFD700",
              "#A9A9A9",
              "#4CAF50",
            ],
            borderRadius: 10,
            barThickness: 60,
          },
        ],
      };

      setBarPerformanceData(barData);
    };
    showBarChart(chosenSubject);
  }, [chosenSubject]);

  const areaChartOptions = {
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
          text: "Time in Minutes",
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
  };

  const stackedChartoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 18,
            weight: "bold",
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
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
          text: "Question numbers",
          color: "black",
          font: {
            size: 18,
            weight: "bold",
          },
        },
      },
      y: {
        stacked: true,
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
          text: "Student count",
          color: "black",
          font: {
            size: 18,
            weight: "bold",
          },
        },
      },
    },
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Top 5 Students",
        color: "black",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Marks",
        },
        ticks: {
          stepSize: 1,
          font: {
            size: 13,
            weight: "bold",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Topper Name",
        },
        ticks: {
          font: {
            size: 15,
            weight: "bold",
          },
        },
      },
    },
  };

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

            <p className="mt-3 text-3xl font-bold text-black dark:text-white">
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
            defaultValue=""
            onChange={(e) => {
              setChosenSubject(e.target.value);
              // console.log("working", e.target.value);
            }}
            className="bg-gray-800 rounded-xl mr-5 mt-5  py-2 border border-gray-400 my-3 px-4 w-60 shadow-2xs shadow-white"
          >
            <option value="" disabled hidden>
              Select Subject
            </option>
            {/* {console.log("subjects examstats", subjects)} */}
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
              Students Appeard in this subject :
              <span className="ml-2 ">{studentCount}</span>{" "}
            </span>
          ) : null}
        </div>
        <div className="w-full h-full  p-3 gap-5 flex-col  flex justify-center items-center   ">
          {stackedChartData && (
            <div className="bg-white w-full h-[400px] p-3 rounded-2xl ">
              <Bar data={stackedChartData} options={stackedChartoptions} />
            </div>
          )}

          {chartData && (
            <div className="bg-white w-full h-[400px] p-3 rounded-2xl ">
              <Line data={chartData} options={areaChartOptions} />
            </div>
          )}
          <div className="flex gap-5 w-full">
            {pieData && (
              <div className="w-1/3  h-[350px] bg-white pt-4 rounded-2xl">
                <Pie data={pieData} options={pieOptions} />
              </div>
            )}
            {barPerformanceData && (
              <div className="w-2/3 h-[350px] bg-white p-4 rounded-2xl">
                <Bar data={barPerformanceData} options={barOptions} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamStats;
