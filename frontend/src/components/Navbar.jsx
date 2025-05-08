import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between bg-gradient-to-r from-blue-700 to-blue-300 text-white p-4">
      <div>
        <Link to="/" className="underline decoration-cyan-500">
          Note App
        </Link>
      </div>
      <div className="flex gap-4 px-4 items-center">
        {currentUser ? (
          <>
            <Link to="/dashboard" className="underline decoration-cyan-500">
              Dashboard
            </Link>
            <Link to="/profile" className="underline decoration-cyan-500">
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="underline decoration-cyan-500">
              Login
            </Link>
            <Link to="/register" className="underline decoration-cyan-500">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;