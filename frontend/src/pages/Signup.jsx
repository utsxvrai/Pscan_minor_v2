import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', rememberMe: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/v1/signup`, {
        name : formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/sign-in');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.response?.data?.message || "Registration failed! Please try again.");
    }
  };

  return (
    
    <div className="min-h-screen  bg-gray-900 flex items-center justify-center p-4">
    <ToastContainer />
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-black rounded-3xl shadow-2xl overflow-hidden">
        {/* Signup Form Section */}
        <div className="flex flex-col p-12">
          <h1 className="text-4xl font-bold text-white mb-12 text-center">Create an Account</h1>

          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-gray-400 text-sm mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name} 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/80 rounded-lg text-gray-300 border-none focus:ring-1 focus:ring-blue-500 outline-none transition placeholder-gray-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-400 text-sm mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                value={formData.email} 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/80 rounded-lg text-gray-300 border-none focus:ring-1 focus:ring-blue-500 outline-none transition placeholder-gray-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-400 text-sm mb-1">Password</label>
              <input 
                type="password" 
                id="password" 
                value={formData.password} 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/80 rounded-lg text-gray-300 border-none focus:ring-1 focus:ring-blue-500 outline-none transition placeholder-gray-500"
                placeholder="6+ characters"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center space-x-2 text-sm text-gray-400">
                <input 
                  type="checkbox" 
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 bg-gray-900 border-gray-700 rounded"
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-500 hover:text-blue-400">
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              className="flex items-center justify-center w-full bg-blue-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-blue-800 active:bg-blue-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded"
            >
              Sign Up
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <button type="button" className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out rounded">
                <FcGoogle className="text-2xl bg-white rounded-full mr-2"/>
                Continue with Google
              </button>
            </div>
          </form>

          <p className="mt-8 text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-blue-800 transition ease-in-out hover:text-blue-700 hover:font-bold">Sign In</Link>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:block relative w-full">
          <img 
            src="/stethoscope.jpg"
            alt="Medical Stethoscope"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
