import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecoveryExercises = () => {
  const navigate = useNavigate();

  const handleViewExercises = () => {
    navigate('/exercises'); // Navigate to the "Exercises" page
  };

  return (
    <div className="bg-purple-400/20 rounded-3xl p-6 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="bg-purple-400/30 p-3 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 10.5h4.5m-7.5 0h3m0 0v-3h3.75m-3.75 3h3.75m-3.75 0v-3"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-lg">Recovery Exercises</h3>
          <p className="text-sm text-gray-300 mb-4">Recommended exercises for recovery which will help you to recover you</p>
          <button
            onClick={handleViewExercises} // Navigate to the Exercises page
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            View Exercises
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecoveryExercises;
