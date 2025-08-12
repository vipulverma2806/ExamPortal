import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      console.log("Login response:", res.data); 
     
      navigate("/dashboard"); 
    } catch (error) {
      // console.error(error)
      // // console.error(
      // //   "Login failed:",
      // //   error.response ? error.response.data : error.message
      // // );
      // setError("Invalid credentials");
    }
  };

  return (
    <div className="w-full justify-center items-center min-h-screen flex">
      <div className="lg:w-1/3 w-full flex justify-center items-center flex-col">
        <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>{" "}
      {/* Register link */}
      </div>
      <div className="hidden lg:block lg:w-2/3">
        <img
          src="../../public/exam.jpg"
          className="min-h-screen object-cover"
          alt="Description"
        />
      </div>
    </div>
  );
};

export default Login;
