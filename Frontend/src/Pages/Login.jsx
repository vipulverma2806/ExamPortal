import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      console.log("Login response:", res);
      toast.success("Login Success");
      if (res.data.role == "teacher") return navigate("/teacherDashboard");
      navigate("/studentDashboard");
    } catch (error) {
      console.error(error);
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      toast.success(error.response ? error.response.data : error.message);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center">
      <div className="flex justify-center lg:justify-end items-center w-full lg:w-1/3">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 flex flex-col p-6  rounded-2xl space-y-5 max-w-sm w-full "
        >
          <h1 className="text-gray-100 text-center text-2xl font-bold">
            Login to ExamPortal
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="placeholder-gray-400 w-full p-3 text-gray-100 rounded-2xl  bg-gray-700"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="placeholder-gray-400 w-full p-3 text-gray-100 rounded-2xl  bg-gray-700"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 rounded-2xl p-3 hover:bg-blue-700 hover:cursor-pointer text-white w-full"
          >
            Submit
          </button>
          <p className="text-gray-200 ">
            Don't have an account :{" "}
            <Link to="/register" className="hover:underline text-blue-500">
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden lg:flex lg:justify-end lg:w-2/3 ">
        <img
          src="../../public/exam.jpg"
          className="min-h-screen object-cover rounded-l-full"
          alt="Description"
        />
      </div>
    </div>
  );
};

export default Login;
