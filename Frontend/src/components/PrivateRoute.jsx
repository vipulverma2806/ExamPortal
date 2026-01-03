
import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const URL = import.meta.env.VITE_URL;
const PrivateRoute = ({ element: Component }) => {
  const BASE = import.meta.env.VITE_URL;
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  //----------checkauth--------
  const checkAuth = async () => {
    try {
      const res = await axios.get(`${URL}/auth/checkAuth`);
      // console.log(res);
      setAuth(true);
      setLoading(false)
    } catch (err) {
      // console.log(err.response.data);
      setAuth(false);
      navigate("/");
    }
  };
  if(loading) return <div>loading</div>
  return <Component/>;
};

export default PrivateRoute;

