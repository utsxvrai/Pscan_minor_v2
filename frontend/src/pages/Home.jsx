import React, { useState } from 'react';
import { Upload, LogIn, UserPlus, X } from 'lucide-react';
import { predictPneumonia } from '../api';
import ChatbotCard from '../components/ChatbotCard';
import HospitalFinder from '../components/HospitalFinder';
import RecoveryExercises from '../components/RecoveryExercises';
import ScanHistory from '../components/ScanHistory';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsModalOpen(true); // Show modal if not authenticated
      return;
    }
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsModalOpen(true); // Show modal if not authenticated
      return;
    }
    setFile(event.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await predictPneumonia(file);
      if (response.data && response.data.prediction) {
        setPrediction(response.data.prediction);
      } else {
        setErrorMessage('Invalid response format');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.detail || 'An error occurred during prediction.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/sign-in'); // Navigate to Sign In page
  };

  const handleRegister = () => {
    navigate('/sign-up'); // Navigate to Sign Up page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-amber-100 mb-8">Hello, it's great to see you</h1>
      </div>

      {/* Main Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Upload Card */}
        <div className="bg-amber-100/10 rounded-3xl p-6 backdrop-blur-sm" style={{ height: '380px' }}>
          <h2 className="text-lg font-semibold mb-4">Upload your X-ray</h2>

          <div
            className="border-2 border-dashed border-gray-400 rounded-xl p-8 text-center cursor-pointer hover:border-white transition-colors"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <Upload className="mx-auto mb-4" />
            <p>Click or drag & drop your X-ray image here</p>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {file && (
            <div className="mt-4">
              <p className="text-sm mb-4">Selected: {file.name}</p>
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Analyze X-ray'}
              </button>
            </div>
          )}

          {prediction && (
            <div className="mt-4 p-4 bg-green-600/20 rounded-lg">
              <h3 className="font-semibold mb-2">Results:</h3>
              <p>{prediction}</p>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-600/20 rounded-lg">
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-gray-800 text-white rounded-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Login Required</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-300 mb-6">
                  Please log in or register to upload your X-ray for analysis.
                </p>
                <div className="flex justify-between gap-4">
                  <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors w-full"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Log In</span>
                  </button>
                  <button
                    onClick={handleRegister}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors w-full"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Register</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Side Cards */}
        <div className="space-y-6">
          <HospitalFinder />
          <RecoveryExercises />
        </div>
      </div>
      <ScanHistory />
      <ChatbotCard />
    </div>
  );
};

export default HomePage;
