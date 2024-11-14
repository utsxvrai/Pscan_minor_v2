import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, userName } = useAuth(); // Access the auth state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black p-4 flex justify-between items-center text-white shadow-lg">
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none p-2">
        <span className="text-2xl">{menuOpen ? '✖' : '☰'}</span>
      </button>

      <div className="flex items-center space-x-8">
        <h1 className="text-xl font-semibold tracking-wide">
          <Link to="/" className="hover:text-gray-400 transition mx-2">
            Pneumonia<span className="text-blue-600">Scan</span>
          </Link>
        </h1>
      </div>

      <div className={`flex items-center space-x-6 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
        <Link to="/about" className="text-sm font-medium hover:text-gray-400 transition">
          About Us
        </Link>
        {isLoggedIn ? (
          <Link
            to="/profile"
            className="mx-2 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-gray-700 transition"
          >
            Profile
          </Link>
        ) : (
          <Link
            to="/sign-in"
            className="mx-2 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-gray-700 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
