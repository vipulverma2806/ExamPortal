import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents,getAllAttempts,getBestWorstSub, getAllQuestions } from "../redux/adminSlice";
const URL = import.meta.env.VITE_URL;
axios.defaults.withCredentials = true;
const TeacherDashboard = () => {
  const [attemptArr, setAttemptArr] = useState([]);
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const isAdmin = true;
 

  //---------logout-------------------
  const logout = async () => {
    try {
      setLoading(true);
      const success = await axios.post(`${URL}/auth/logout`);

      toast.success("Logout Succesfully");
      navigate("/");
      return setLoading(false);
    } catch (err) {
      return console.log(err);
    }
  };
  //----------get user detals------------
  const getDetails = async () => {
    try {
      const success = await axios.get(`${URL}/auth/getDetails`);

      return setDetails(success.data);
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  //---------get all Students-------

  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(getAllAttempts());
    dispatch(getBestWorstSub())
    dispatch(getAllQuestions());
  }, []);


  return (
    <div className="p-4  flex text-white h-screen bg-gray-700 ">
      <div className="fixed py-4 px-4 flex gap-x-5 shadow-xl shadow-black bg-gray-600 rounded-3xl pb-4 w-[97%] h-[95%]">
        <div className="w-60  flex flex-col justify-between shadow-md shadow-black rounded-xl p-6 bg-gray-800 h-full">
          <nav className="flex  flex-col gap-2">
            <div className="flex flex-col gap-2 ">
              <h2 className="text-xl font-bold ml-2  text-white">
                Teacher's Dashboard
              </h2>
              <h3 className=" text-xl rounded-xl bg-gray-900 p-3">
                Welcome,{" "}
                <span className="font-bold text-teal-600">
                  {details?.name && details.name.split(" ")[0]}
                </span>
              </h3>
            </div>
            <div className="flex flex-col gap-2 py-3 ">
              <NavLink
                to=""
                end
                className={({ isActive }) =>
                  `p-2 rounded-md ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-blue-500  "
                  }`
                }
              >
                Exam Wise Stats
              </NavLink>

              <NavLink
                to="leaderboard"
                className={({ isActive }) =>
                  `p-2 rounded-md ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
                  }`
                }
              >
                Leaderboard
              </NavLink>

              <NavLink
                to="add-exam"
                className={({ isActive }) =>
                  `p-2 rounded-md ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
                  }`
                }
              >
                Add Exam
              </NavLink>
              <NavLink
                to="modify-exam"
                className={({ isActive }) =>
                  `p-2 rounded-md ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
                  }`
                }
              >
                Modify Exam
              </NavLink>
              <NavLink
                to="manage-students"
                className={({ isActive }) =>
                  `p-2 rounded-md ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
                  }`
                }
              >
                Manage Students
              </NavLink>
              <NavLink
                to="profile-settings"
                className={({ isActive }) =>
                  `p-2 rounded-md ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
                  }`
                }
              >
                Profile Settings
              </NavLink>
            </div>
          </nav>
          <div className="flex flex-col gap-y-4">
            <button
              onClick={logout}
              className={`
                p-2 mt-2 rounded-md
                     text-white   ${
                       loading ? "bg-green-600" : "bg-red-600 hover:bg-red-800"
                     }`}
            >
              {loading ? "Wait..." : "Logout"}
            </button>
          </div>
        </div>

        <div className="flex-1 shadow-md shadow-black bg-gray-800 overflow-auto h-auto rounded-2xl  p-3 ">
          <Outlet context={{ details, attemptArr, getDetails ,isAdmin }} />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
