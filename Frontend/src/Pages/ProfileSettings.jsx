import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_URL;
const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();
  const { details ,getDetails } = useOutletContext();
  const {isAdmin} = useOutletContext();
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (password.trim() !== rePassword.trim()) return setPasswordMatch(false);
    if (!(name || email)) return toast.error("Please fill something");
    setPasswordMatch(true);
    console.log(passwordMatch);

    try {
      await axios.put(`${URL}/auth/updateProfile`, {
        name: name.trim(),
        email : email.trim(),
        password : password.trim(),
      });
      toast.success("updated Successfully");
      setName("");
      setPassword("");
      setEmail("");
      getDetails();
      if(isAdmin) return navigate("/teacherDashboard") 
      navigate("/studentDashboard")
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  const inputCSS =
    "placeholder-gray-400 placeholder:text-xl w-full p-4 text-gray-100 rounded-2xl  bg-gray-700";
  return (
    <div className="flex justify-center items-center  w-full h-full">
      <form
        onSubmit={handleUpdate}
        className="bg-gray-800 flex flex-col p-6   rounded-2xl space-y-5 max-w-2xl w-full "
      >
        <h1 className="text-gray-100 mb-10 text-center text-5xl w-full  font-bold">
          Update your Profile
        </h1>
        <input
          type="text"
          placeholder={details.name}
          className={inputCSS}
          onChange={(e) => {setName(e.target.value)
         
          }}
          value={name}
        />
        <input
          type="email"
          placeholder={details.email}
          className={inputCSS}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="New Password"
          className={inputCSS}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <input
          type="password"
          placeholder="Re-Enter New Password"
          className={inputCSS}
          onChange={(e) => {
            setRePassword(e.target.value);
          }}
          value={rePassword}
        />
        <div className=" h-2">
          <p
            className={`text-red-500 semibold ${
              passwordMatch ? "hidden" : "blcok"
            }`}
          >
            *Password does not match
          </p>
        </div>

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



