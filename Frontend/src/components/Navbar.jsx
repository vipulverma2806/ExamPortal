import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar-list">
          {!token ? (
            <>
              <li className="navbar-item"><Link to="/register" className="navbar-link ">Register</Link></li>
              <li className="navbar-item"><Link to="/login" className="navbar-link">Login</Link></li>
            </>
          ) : (
            <>
              <li className=""><Link to="/user-dashboard" className=" text-green-900 text-3xl">User Dashboard</Link></li>
              <li className="text-green-900 text-4xl"><Link to="/" className="">Logout</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
