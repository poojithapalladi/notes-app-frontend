import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 sticky top-0 z-50 shadow">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">Note App</Link>

        {/* Hamburger for mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden focus:outline-none"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          <input
            type="text"
            placeholder="Search notes"
            className="px-3 py-2 rounded bg-gray-700 text-white"
            onChange={(e) => setQuery(e.target.value)}
          />
          {!user ? (
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
              Login
            </Link>
          ) : (
            <>
              <span className="font-semibold">{user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-3 mt-3 lg:hidden">
          <input
            type="text"
            placeholder="Search notes"
            className="px-3 py-2 rounded bg-gray-700 text-white"
            onChange={(e) => setQuery(e.target.value)}
          />
          {!user ? (
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-center">
              Login
            </Link>
          ) : (
            <>
              <span className="font-semibold">{user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
