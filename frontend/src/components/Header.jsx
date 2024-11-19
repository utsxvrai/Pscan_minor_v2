import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth(); // Access the auth state and logout function
  const [pageState, setPageState] = useState('Sign In'); // Dynamic page state for "Sign In" or "Profile"
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Update pageState based on login status and token
  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      setPageState('Profile'); // Show "Profile" when user is logged in
    } else {
      setPageState('Sign In'); // Show "Sign In" when user is not logged in
    }
  }, [isLoggedIn]); // Trigger when login state changes

  // Check if the current route matches the specified route
  const pathMatchRoute = (route) => route === location.pathname;

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center text-white shadow-md">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-blue-400 transition">
            Pneumonia<span className="text-blue-600">Scan</span>
          </Link>
        </h1>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none text-white"
      >
        <span className="text-2xl">{menuOpen ? '✖' : '☰'}</span>
      </button>

      {/* Links */}
      <div
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8`}
      >
        <Link
          to="/"
          className={`py-2 text-sm font-medium border-b-2 border-transparent hover:text-blue-600 hover:border-white-400 transition ${
            pathMatchRoute('/') && 'text-white border-white-400'
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`py-2 text-sm font-medium border-b-2 border-transparent hover:text-blue-600 hover:border-white-400 transition ${
            pathMatchRoute('/about') && 'text-white border-white-400'
          }`}
        >
          About Us
        </Link>
        <div
          onClick={() => {
            if (pageState === 'Sign In') {
              navigate('/sign-in');
            } else {
              navigate('/profile');
            }
          }}
          className={`py-2 text-sm font-medium cursor-pointer border-b-2 border-transparent hover:text-blue-600 hover:border-white-400 transition ${
            pathMatchRoute('/profile') && 'text-white border-white-400'
          }`}
        >
          {pageState}
        </div>

        {isLoggedIn && (
          <button
            onClick={() => {
              logout();
              localStorage.removeItem('authToken');
              setPageState('Sign In');
              navigate('/');
            }}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-md transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
