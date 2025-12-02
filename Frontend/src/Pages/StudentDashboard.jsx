import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import NavBar from "../Component/NavBar";
// import { getAdminData, cleanAdminData } from "../Redux/AdminSlice";
import { toast } from "react-toastify";
// import { logout } from "../Redux/AuthSlice";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const URL = import.meta.env.VITE_URL;
axios.defaults.withCredentials = true;
const StudentDashboard = () => {
//   const dispatch = useDispatch();
  const navigate = useNavigate();
  // const loading = useSelector((state) => state.auth.loading);
  // const logoutSuccess = useSelector((state) => state.listing.navigate);
  const [loading, setLoading] = useState();
  // useEffect(() => {
  //   if (logoutSuccess) return navigate("/");
  // }, [logoutSuccess]);

  const logout = async () => {
    try {
      setLoading(true);
      const success = await axios.delete(`${URL}/auth/logout`);
    //   dispatch(cleanAdminData());
      toast.success("Logout Succesfully");
      navigate("/");
      return setLoading(false);
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div className="p-4 flex text-white h-screen bg-gray-700 ">
      <div className="fixed py-4 px-4 flex gap-x-5 shadow-xl shadow-black bg-gray-600 rounded-3xl pb-4 w-[97%] h-[95%]">
        <div className="w-60 flex flex-col justify-between shadow-md shadow-black rounded-xl p-6 bg-gray-800 h-full">
          <nav className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold ml-2 text-white mb-6">
              Student Dashboard
            </h2>
            <h3>Welcome - name here</h3>
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `p-2 rounded-md ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200 bg-gray-600 "
                }`
              }
            >
              Summary
            </NavLink>

            <NavLink
              to="statistics"
              className={({ isActive }) =>
                `p-2 rounded-md ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              Statistics
            </NavLink>

            <NavLink
              to="allListings"
              className={({ isActive }) =>
                `p-2 rounded-md ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              All Listings
            </NavLink>

            <NavLink
              to="allUsers"
              className={({ isActive }) =>
                `p-2 rounded-md ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              All Users
            </NavLink>
          </nav>
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

        <div className="flex-1 shadow-md shadow-black bg-gray-100 overflow-auto rounded-xl  p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
