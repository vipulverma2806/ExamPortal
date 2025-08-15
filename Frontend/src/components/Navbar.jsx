import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
  //---------------logout--------------------
  const handleLogout = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/auth/logout`);
      console.log(res);
      navigate("/");
      toast.info("Logout successful.");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="">
      <nav className="">
        <ul className="flex p-4 justify-between bg-gray-900">
          <li>
            <h1 className="text-gray-300 font-bold text-3xl">
              Welcome to ExamPortal
            </h1>
          </li>
          <div className="flex gap-x-3">
            <li className="">
              <Link
                to="/user-dashboard"
                className=" text-gray-300 text-xl hover:underline hover:text-blue-700"
              >
                User Dashboard
              </Link>
            </li>
            <li className="">
              <button
                onClick={handleLogout}
                className="text-xl bg-red-600 rounded-md w-25 text-gray-100 font-semibold pb-1 hover:bg-red-800 hover:cursor-pointer"
              >
                Logout
              </button>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
