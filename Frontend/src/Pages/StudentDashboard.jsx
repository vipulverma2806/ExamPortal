import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import NavBar from "../Component/NavBar";
// import { getAdminData, cleanAdminData } from "../Redux/AdminSlice";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
// import { logout } from "../Redux/AuthSlice";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
axios.defaults.withCredentials = true;
const StudentDashboard = () => {
  const [attemptArr, setAttemptArr] = useState([]);
  const [details, setDetails] = useState({});
  const [isDataFetched,setIsDataFetched] = useState(false)
   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${URL}/api/getStudentSummary`);
        setAttemptArr(res.data?.data);
        setIsDataFetched(true);
        console.log("res-data", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log("attemptArr UPDATED:", attemptArr);

  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  // const loading = useSelector((state) => state.auth.loading);
  // const logoutSuccess = useSelector((state) => state.listing.navigate);
  const [loading, setLoading] = useState();

  const logout = async () => {
    try {
      setLoading(true);
      const success = await axios.post(`${URL}/auth/logout`);
      //   dispatch(cleanAdminData());
      toast.success("Logout Succesfully");
      navigate("/");
      return setLoading(false);
    } catch (err) {
      return console.log(err);
    }
  };

  const getDetails = async () => {
    try {
      const success = await axios.get(`${URL}/auth/getDetails`);

      return setDetails(success.data.data);
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="p-4 flex text-white h-screen bg-gray-700 ">
      <div className="fixed py-4 px-4 flex gap-x-5 shadow-xl shadow-black bg-gray-600 rounded-3xl pb-4 w-[97%] h-[95%]">
        <div className="w-60 flex flex-col justify-between shadow-md shadow-black rounded-xl p-6 bg-gray-800 h-full">
          <nav className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 ">
              <h2 className="text-3xl font-bold ml-2 text-white">
                Student Dashboard
              </h2>
              <h3 className=" text-2xl rounded-xl bg-gray-900 p-3">
                Welcome,{" "}
                <span className="font-bold text-teal-600">{details.name}</span>
              </h3>
            </div>
            <div className="flex flex-col gap-3 ">
              <NavLink
                to=""
                end
                className={({ isActive }) =>
                  `p-2 rounded-md ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-blue-500  "
                  }`
                }
              >
                Summary
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
                to="reviewExams"
                className={({ isActive }) =>
                  `p-2 rounded-md ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
                  }`
                }
              >
                Review Exams
              </NavLink>

              <NavLink
                to="profileSettings"
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
            <NavLink
              to="/dashboard"
              className={`
                p-2 text-center rounded-md
                     text-white   ${
                       loading
                         ? "bg-red-600"
                         : "bg-green-600 hover:bg-green-800"
                     }`}
            >
              Give Exam
            </NavLink>
            <button
              onClick={logout}
              className={`
                p-2 rounded-md
                     text-white   ${
                       loading ? "bg-green-600" : "bg-red-600 hover:bg-red-800"
                     }`}
            >
              {loading ? "Wait..." : "Logout"}
            </button>
          </div>
        </div>

        <div className="flex-1 shadow-md shadow-black bg-gray-800 overflow-auto h-auto rounded-2xl  p-3 ">
          {isDataFetched && (
            <Outlet context={{ details, attemptArr, getDetails }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
