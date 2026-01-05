import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate, useNavigate,
} from "react-router-dom";
import Quiz from "../src/Pages/Quiz";
import StudentDashboard from "./Pages/StudentDashboard";

import QuizHome from "./Pages/QuizHome";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AddExam from "./Pages/AddExam";
import ExamStats from "./Pages/ExamStats";
import ManageStudents from "./Pages/ManageStudents";
import ModifyExams from "./Pages/ModifyExams";
import TeacherDashboard from "./Pages/TeacherDashboard";

import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";

import Leaderboard from "./Pages/LeaderBoard";

import ReviewExams from "./Pages/ReviewExams";
import StudentSummary from "./Pages/StudentSummary";
import ProfileSettings from "./Pages/ProfileSettings";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";

function App() {
  
  const router = createBrowserRouter([
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/studentDashboard",
      element: <PrivateRoute element={StudentDashboard} />,
      children: [
        {
          index: true,
          element: <StudentSummary />,
        },

        {
          path: "leaderboard",
          element: <Leaderboard />,
        },
        {
          path: "profileSettings",
          element: <profileSettings />,
        },
        {
          path: "reviewExams",
          element: <ReviewExams />,
        },
        {
          path: "quiz/:subject",
          element: <Quiz/>,
        },

        {
          path: "quizHome",
          element: <QuizHome/>,
        },
      ],
    },

    {
      path: "/teacherDashboard",
      element: <PrivateRouteAdmin element={TeacherDashboard} />,
      children: [
        {
          index: true,
          element: <ExamStats />,
        },
        {
          path: "add-exam",
          element: <AddExam />,
        },

        {
          path: "modify-exam",
          element: <ModifyExams />,
        },
        {
          path: "leaderboard",
          element: <Leaderboard />,
        },

        {
          path: "manage-students",
          element: <ManageStudents />,
        },
        {
          path: "profile-settings",
          element: <ProfileSettings />,
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
