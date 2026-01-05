import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const URL = import.meta.env.VITE_URL;
const PrivateRouteAdmin = ({ element: Component }) => {
 
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  //----------checkauth--------
  const checkAuth = async () => {
    try {
      const res = await axios.get(`${URL}/auth/checkAuth`);
      // console.log(res.data.role);
      setRole(res.data.role);
      setLoading(false);
    } catch (err) {
      // console.log(err.response.data);
      setRole("");
      setLoading(false);
      return navigate("/");
    }
  };
  if (loading)
    return (
      <div className="flex justify-center items-center text-4xl">loading</div>
    );
  
  return (
    <>
      {role === "teacher" && <Component />}
      {role === "student" && <Navigate to="/studentDashboard" />}
      {/* <AdminElement/> */}
    </>
  );
};

export default PrivateRouteAdmin;
