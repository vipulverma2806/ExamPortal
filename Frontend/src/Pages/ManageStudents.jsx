import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const ManageStudents = () => {
  const studentsFromStore = useSelector(
    (state) => state.adminData?.allStudents
  );
  const attemptsFromStore = useSelector(
    (state) => state.adminData?.allAttempts
  );
  const [allStudents, setAllStudents] = useState([]);
  useEffect(() => {
    setAllStudents(studentsFromStore);
  }, []);

  const seeReport = (id) => {
    const currentStudentAttempts = attemptsFromStore.filter(
      (attempt) => attempt.userId == id
    );
    console.log(currentStudentAttempts)
  };
  return (
    <div className="p-5">
      <div className="max-w-4xl mx-auto">
        {/* Table Header */}
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
        {allStudents.length > 0 ? (
          <div className="space-y-3">
            {allStudents.map((student, i) => {
              const serialNo = i + 1;

              return (
                // <div
                //   key={i}
                //   className="grid grid-cols-28 items-center rounded-2xl p-3 pr-0 shadow-md  bg-gradient-to-r from-gray-800 py-4 px-8 to-gray-900 border border-cyan-500 "

                //   // className="grid grid-cols-28 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-xl shadow-lg py-4 px-10 mb-4"
                // >
                //   <div className="col-span-1 bg-red-500 text-center">
                //     <span className="text-lg font-bold">{serialNo}</span>
                //   </div>

                //   {/* Name */}
                //   <div className="col-span-7 bg-amber-600 md:col-span-8 ">
                //     <div className="flex items-center">
                //       <p className="text-lg text-white font-medium truncate">
                //         {student.name}
                //       </p>
                //     </div>
                //   </div>

                //   <div className="col-span-4 md:col-span-7 bg-yellow-400 text-center">
                //     <div className="flex items-center justify-center">
                //       <span className="text-lg font-medium text-white mr-2">
                //         {student.courseName}
                //       </span>
                //     </div>
                //   </div>
                //   <div className="col-span-4 md:col-span-7 text-center bg-red-900">
                //     <div className="flex items-center justify-center">
                //       <span className="text-lg font-medium text-white mr-2">
                //         {student.rollNo}
                //       </span>
                //     </div>
                //   </div>
                //   <div className="col-span-4  bg-red-00  md:col-span-5 bg-green-900 text-center">
                //     <div className="flex items-center w-full justify-center">
                //       <button
                //         onClick={() => showReport(student._id)}
                //         className="text-lg bg-teal-700  py-2 px-3    rounded-2xl font-medium text-white "
                //       >
                //         See Report
                //       </button>
                //     </div>
                //   </div>
                // </div>

                <div className="grid grid-cols-28   text-white rounded-xl bg-gray-700 shadow-2xl py-4 px-8 mb-4">
                  <div className="col-span-2   text-center">
                    <span className="text-lg font-bold">{serialNo}.</span>
                  </div>

                  <div className="col-span-7 md:col-span-7  ">
                    <span className="text-lg  pl-4">{student.name}</span>
                  </div>

                  <div className="col-span-7 md:col-span-8 ">
                    <span className="text-lg  pl-8">{student.courseName}</span>
                  </div>

                  <div className="col-span-7 md:col-span-7 ">
                    <span className="text-lg  pl-8">{student.rollNo}</span>
                  </div>

                  <div className="col-span-4 md:col-span-4 text-center ">
                    <button
                      onClick={() => seeReport(student._id)}
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
    </div>
  );
};

export default ManageStudents;
