import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StudentSummary from "./StudentSummary";
const ManageStudents = () => {
  const studentsFromStore = useSelector(
    (state) => state.adminData?.allStudents,
  );
  const attemptsFromStore = useSelector(
    (state) => state.adminData?.allAttempts,
  );
  const [currentStudentAttempts, setCurrentStudentAttempts] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [seeReportClicked, setSeeReportClicked] = useState(false);
  const [currentStudentInfo, setCurrentStudentInfo] = useState({});
  useEffect(() => {
    setAllStudents(studentsFromStore);
  }, []);

  const seeReport = (id, studentName, studentRollNo, studentCourse) => {
    setCurrentStudentAttempts(
      attemptsFromStore.filter((attempt) => attempt.userid == id),
    );
    setCurrentStudentInfo({ studentName, studentRollNo, studentCourse });
    setSeeReportClicked(true);
  };
  console.log("currentstudents 26", currentStudentAttempts);
  return (
    <div className="p-1 h-full">
      <div
        className={`max-w-4xl mx-auto ${seeReportClicked ? "hidden" : "block"}`}
      >
        <div className="grid grid-cols-28 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-xl shadow-lg py-4 px-8 mb-4">
          <div className="col-span-2  text-center">
            <span className="text-lg font-bold">No.</span>
          </div>

          <div className="col-span-7 md:col-span-7  ">
            <span className="text-lg font-bold pl-4">Name</span>
          </div>

          <div className="col-span-7 md:col-span-8 ">
            <span className="text-lg font-bold pl-8">Course</span>
          </div>

          <div className="col-span-7 md:col-span-7 ">
            <span className="text-lg font-bold pl-8">Roll No.</span>
          </div>

          <div className="col-span-4 md:col-span-4 text-center ">
            <span className="text-lg font-bold">Action</span>
          </div>
        </div>
        {console.log(allStudents)}
        {allStudents.length > 0 ? (
          <div className="space-y-3">
            {allStudents.map((student, i) => {
              const serialNo = i + 1;

              return (
                <div className="grid grid-cols-28   text-white rounded-xl bg-gray-700 shadow-2xl py-4 px-8 mb-4">
                  <div className="col-span-2   text-center">
                    <span className="text-lg font-bold">{serialNo}.</span>
                  </div>

                  <div className="col-span-7 md:col-span-7  ">
                    <span className="text-lg  pl-4">{student.name}</span>
                  </div>

                  <div className="col-span-7 md:col-span-8 ">
                    <span className="text-lg  pl-8">{student.coursename}</span>
                  </div>

                  <div className="col-span-7 md:col-span-7 ">
                    <span className="text-lg  pl-8">{student.rollno}</span>
                  </div>

                  <div className="col-span-4 md:col-span-4 text-center ">
                    <button
                      onClick={() =>
                        seeReport(
                          student.userid,
                          student.name,
                          student.rollno,
                          student.coursename,
                        )
                      }
                      className="text-md py-1 bg-teal-700 px-4 rounded-xl hover:cursor-pointer  "
                    >
                      See Report
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">No other participants yet</p>
          </div>
        )}
      </div>
      {seeReportClicked && (
        <div className="h-full">
          <div className="w-full flex gap-x-3">
            <button
              className="p-1 px-6 ml-1 rounded-md bg-blue-500 mb-3 "
              onClick={() => setSeeReportClicked(false)}
            >
              Back
            </button>
            <div className=" p-1 px-5 mr-5 flex-1 flex justify-evenly rounded-md bg-teal-600 mb-3 text-xl font-semibold">
              <span className="">Name : {currentStudentInfo.studentName}</span>
              <span>Roll No. : {currentStudentInfo.studentRollNo}</span>
              <span>Course : {currentStudentInfo.studentCourse}</span>
            </div>
          </div>
          {console.log(currentStudentAttempts)}
          <StudentSummary
            currentStudentAttempts={currentStudentAttempts}
          ></StudentSummary>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
