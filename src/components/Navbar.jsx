import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import { useAuth } from '../context/ContextProvider';

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // ✅ use navigate hook

  const handleLogout = () => {
    logout();          // your logout function
    navigate('/login'); // ✅ redirect to login page after logout
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Left: Logo / App Title */}
        <h1 className="text-xl font-bold">Note App</h1>

        {/* Center: Search Input */}
        <input
          type="text"
          placeholder="Search notes"
          onChange={(e) => setQuery(e.target.value)} // ✅ connect to query
          className="w-full sm:w-64 px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 outline-none"
        />

        {/* Right: User Info + Logout */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="font-semibold">Demo User</span>
          <button
            onClick={handleLogout} // ✅ trigger logout and redirect
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
