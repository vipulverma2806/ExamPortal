import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {toast} from "react-toastify"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      toast.success("Registered Successfully")
      setName("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-900 flex items-center">
      <div className="flex justify-center lg:justify-end items-center w-full lg:w-1/3">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 flex flex-col p-6  rounded-2xl space-y-5 max-w-sm w-full "
      >
        <h1 className="text-gray-100 text-center text-2xl font-bold">
          Register to ExamPortal
        </h1>
        <input
          type="text"
          placeholder="Name"
          className="placeholder-gray-400 text-gray-100 w-full p-3 rounded-2xl  bg-gray-700"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
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
          Already have an account :{" "}
          <Link to="/" className="hover:underline text-blue-500">
            {" "}
            Login
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

export default Register;
