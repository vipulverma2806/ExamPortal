import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Quiz2 from "./components/Quiz2";
import Quiz from "../src/Pages/Quiz";
import StudentDashboard from "./Pages/StudentDashboard";
import AddQuestion from "./components/AddQuestion";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserDashboard from "./Pages/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import Dashboard2 from "./components/Dashboard2";
import AllExams from "./Pages/AllExams";

import Leaderboard from "./Pages/LeaderBoard";
import profileSettings from "./Pages/ProfileSettings";
import ReviewExams from "./Pages/ReviewExams";
import StudentSummary from "./Pages/StudentSummary";

function App() {
  const router = createBrowserRouter([
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
      path: "/studentDashboard",
      element: <PrivateRoute element={StudentDashboard} />,
      children: [
        {
          index: true,
          element: <PrivateRoute element={StudentSummary} />,
        },
        {
          path: "allExams",
          element: <PrivateRoute element={AllExams} />,
        },

        {
          path: "leaderboard",
          element: <PrivateRoute element={Leaderboard} />,
        },
        {
          path: "profileSettings",
          element: <PrivateRoute element={profileSettings} />,
        },
        {
          path: "reviewExams",
          element: <PrivateRoute element={ReviewExams} />,
        },
      ],
    },

 {
      path: "/teacherDashboard",
      element: <PrivateRoute element={TeacherDashboard} />,
      children: [
        {
          index: true,
          element: <PrivateRoute element={TeacherSummary} />,
        },
        {
          path: "add-Exam",
          element: <PrivateRoute element={AddExam} />,
        },

        {
          path: "modifyExam",
          element: <PrivateRoute element={ModifyExam} />,
        },
        {
          path: "profileSettings",
          element: <PrivateRoute element={Leader} />,
        },
        {
          path: "reviewExams",
          element: <PrivateRoute element={ReviewExams} />,
        },
      ],
    },
    








    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <Login />,
    },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
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
