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
import AddExam from "./Pages/AddExam";
import ExamStats from "./Pages/ExamStats"
import ManageStudents from "./Pages/ManageStudents"
import ModifyExams from "./Pages/ModifyExams"
import TeacherDashboard from "./Pages/TeacherDashboard"
import TeacherSummary from "./Pages/TeacherSummary"
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import Dashboard2 from "./components/Dashboard2";
import Leaderboard from "./Pages/LeaderBoard";
import profileSettings from "./Pages/ProfileSettings";
import ReviewExams from "./Pages/ReviewExams";
import StudentSummary from "./Pages/StudentSummary";
import ProfileSettings from "./Pages/ProfileSettings";

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
          element: <PrivateRoute element={ExamStats} />,
        },
        {
          path: "add-exam",
          element: <PrivateRoute element={AddExam} />,
        },

        {
          path: "modify-exam",
          element: <PrivateRoute element={ModifyExams} />,
        },
        {
          path: "leaderboard",
          element: <PrivateRoute element={Leaderboard} />,
        },
        
        {
          path: "manage-students",
          element: <PrivateRoute element={ManageStudents} />,
        },
        {
          path: "profile-settings",
          element: <PrivateRoute element={ProfileSettings} />,
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
