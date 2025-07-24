import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 sticky top-0 z-50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        {/* Logo */}
        <h1 className="text-lg sm:text-xl font-bold">Note App</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search notes"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-64 px-3 py-1.5 rounded-md bg-gray-800 text-white placeholder-gray-400 outline-none text-sm sm:text-base"
        />

        {/* Auth Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {!user ? (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-md text-white text-center text-sm sm:text-base w-full sm:w-auto"
            >
              Login
            </Link>
          ) : (
            <>
              <span className="font-medium text-sm sm:text-base">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-white text-sm sm:text-base w-full sm:w-auto"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
