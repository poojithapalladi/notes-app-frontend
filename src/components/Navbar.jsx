import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Note App
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden focus:outline-none"
        >
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        </button>
      </div>

      {/* Menu Section */}
      <div
        className={`flex-col lg:flex lg:flex-row lg:items-center gap-4 mt-3 ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search notes"
          className="w-full lg:w-64 px-4 py-2 rounded bg-gray-600 text-white"
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Auth Controls */}
        {!user ? (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-center"
          >
            Login
          </Link>
        ) : (
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
            <span className="font-medium">{user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
