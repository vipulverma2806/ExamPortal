import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      alert("Register Successfully");
      setname("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="w-full justify-center items-center min-h-screen flex">
      
        
        <form onSubmit={handleSubmit} className="lg:w-1/3 w-full flex justify-center items-center flex-col">
          <h1>Register</h1>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className=""
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=""
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=""
          />
          <button type="submit" className="">
            Register
          </button>
           <p className="text-left w-full">
          Already have an account?{" "}
          <Link to path="/login" className="text-blue-600 hover:cursor-pointer">
            Login here
          </Link>
        </p>
        </form>
       
    
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

export default Register;
