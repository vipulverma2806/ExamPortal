import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import AddQuestion from './components/AddQuestion';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/register" /> // Redirect to register page
    },
    {
      path: '/quiz/:category',
      element: <><Navbar /><Quiz /></>
    },
    {
      path: '/add-question',
      element: <><Navbar /><AddQuestion /></>
    },
    {
      path: '/dashboard',
      element: <><Navbar /><PrivateRoute element={Dashboard} /></>
    },
    {
      path: '/register',
      element: <><Register /></>
    },
    {
      path: '/login',
      element: <><Login /></>
    },
    {
      path: '/user-dashboard',
      element: <><Navbar /><PrivateRoute element={UserDashboard} /></>
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
