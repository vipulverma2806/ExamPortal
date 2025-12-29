import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const location = useLocation();
  const allPaths = [
    { path: "/dashboard", label: "Choose a subject" },
    { path: "/studentDashboard", label: "Dashboard" },
  ];

  const otherPaths = allPaths.filter((page) => page.path !== location.pathname);

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
    <div className="fixed  w-full">
      <nav className="">
        <ul className="flex pt-5 p-4 justify-between bg-gradient-to-r from-teal-800 to-gray-950">
          <h1 className="text-gray-300  flex justify-center items-center font-bold text-3xl">
            Welcome to ExamPortal
          </h1>
          <div className="flex justify-between items-center">
            <Link to={`${otherPaths[0].path}`}>
              <button className="text-xl bg-green-600 rounded-md w-50 mr-3 text-gray-100 font-semibold pb-1 hover:bg-green-800 hover:cursor-pointer">
                {`${otherPaths[0].label}`}
              </button>
            </Link>
            <li className="">
              <button
                onClick={handleLogout}
                className="text-xl bg-red-600 rounded-md w-25 text-gray-100 font-semibold pb-1 hover:bg-red-800 hover:cursor-pointer"
              >
                Logout
              </button>
              {}
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
