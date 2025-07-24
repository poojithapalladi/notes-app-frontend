import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

const Navbar = ({setQuery}) => {
    const {user, logout}=useAuth();

     return(
          <nav className="bg-gray-900 text-white p-4">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
    
    {/* Left: Logo / App Title */}
    <h1 className="text-xl font-bold">Note App</h1>

    {/* Center: Search Input */}
    <input
      type="text"
      placeholder="Search notes"
      className="w-full sm:w-64 px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 outline-none"
    />

    {/* Right: User Info + Logout */}
    <div className="flex items-center justify-between sm:justify-end gap-2">
      <span className="font-semibold">Demo User</span>
      <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white">
        Logout
      </button>
    </div>
  </div>
</nav>


    )}
    export default Navbar; 