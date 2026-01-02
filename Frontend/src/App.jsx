import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Quiz from "../src/Pages/Quiz";
import StudentDashboard from "./Pages/StudentDashboard";
import AddQuestion from "./components/AddQuestion";
import QuizHome from "./Pages/QuizHome";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AddExam from "./Pages/AddExam";
import ExamStats from "./Pages/ExamStats";
import ManageStudents from "./Pages/ManageStudents";
import ModifyExams from "./Pages/ModifyExams";
import TeacherDashboard from "./Pages/TeacherDashboard";
import TeacherSummary from "./Pages/TeacherSummary";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";

import Leaderboard from "./Pages/LeaderBoard";
import profileSettings from "./Pages/ProfileSettings";
import ReviewExams from "./Pages/ReviewExams";
import StudentSummary from "./Pages/StudentSummary";
import ProfileSettings from "./Pages/ProfileSettings";

function App() {
  const router = createBrowserRouter([
    {
      path: "/quiz/:subject",
      element: <PrivateRoute element={Quiz} />,
    },

    {
      path: "/add-question",
      element: <AddQuestion />,
    },
    {
      path: "/quizHome",
      element: <PrivateRoute element={QuizHome} />,
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
