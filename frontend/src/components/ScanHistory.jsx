import React from 'react';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScanHistory = () => {
  const navigate = useNavigate();

  const handleViewHistory = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <div className="bg-blue-400/20 rounded-3xl p-4 backdrop-blur-md mt-6 md:max-w-[62%] mx-auto">
      <div className="flex items-center justify-between">
        {/* Icon and Text Section */}
        <div className="flex items-center gap-4">
          <div className="bg-blue-500/40 p-3 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">View Scan History</h3>
            <p className="text-sm text-gray-300">
              Check all your previously analyzed X-rays and their results.
            </p>
          </div>
        </div>

        {/* Button Section */}
        <button
          onClick={handleViewHistory}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          <Clock className="h-5 w-5" />
          <span>Go to Scan History</span>
        </button>
      </div>
    </div>
  );
};

export default ScanHistory;
