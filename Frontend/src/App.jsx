import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";
import AddQuestion from "./components/AddQuestion";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter([
    // {
    //   path: '/register',
    //   element: <Navigate to="/register" /> // Redirect to register page
    // },
    {
      path: "/quiz/:category",
      element: <PrivateRoute element={Quiz} />,
    },
    {
      path: "/add-question",
      element: <AddQuestion />,
    },
    {
      path: "/dashboard",
      element: <PrivateRoute element={Dashboard} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/user-dashboard",
      element: <PrivateRoute element={UserDashboard} />,
    },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
