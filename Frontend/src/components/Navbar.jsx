import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="w-full">
      <nav className="w-full">
        <ul className="w-full">
          {!token ? (
            <>
              <li className=" text-white"><Link to="/register" className="">Register</Link></li>
              <li className=""><Link to="/login" className="">Login</Link></li>
            </>
          ) : (
            <div className='w-full'>
              <li className="w-full"><Link to="/user-dashboard" className=" text-green-900 bg-gray-700 w-full text-3xl">User Dashboard</Link></li>
              <li className="text-green-900 text-4xl"><Link to="/" className="">Logout</Link></li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
