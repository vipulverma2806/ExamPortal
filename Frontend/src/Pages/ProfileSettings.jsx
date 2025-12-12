import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();
  const { details } = useOutletContext();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      toast.success("Registered Successfully");
      setName("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  const inputCSS =
    "placeholder-gray-400 placeholder:text-xl w-full p-4 text-gray-100 rounded-2xl  bg-gray-700";
  return (
    <div className="flex justify-center items-center  w-full h-full">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 flex flex-col p-6   rounded-2xl space-y-5 max-w-2xl w-full "
      >
        <h1 className="text-gray-100 mb-10 text-center text-5xl w-full  font-bold">
          Update your Profile
        </h1>
        <input
          type="text"
          placeholder={details.name}
          className={inputCSS}
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <input
          type="email"
          placeholder={details.email}
          className={inputCSS}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className={inputCSS}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <input
          type="password"
          placeholder="Re-Enter New Password"
          className={inputCSS}
          onChange={(e) => setRePassword(e.target.value)}
          value={rePassword}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 rounded-2xl p-3 hover:bg-blue-700 hover:cursor-pointer text-xl text-white w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;

{
  /* 
<div>
      <div>Update Your crediantials</div>
      <form action="">
        <div>
          <h4>Name:</h4>
          <input type="text" />
        </div>
        <div>
          <h4>Email Id:</h4>
          <input type="email" />
        </div>
        <div>Password:</div>
        <input type="password" />
      </form>
    </div> */
}
