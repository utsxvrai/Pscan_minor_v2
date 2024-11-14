import React, { useState } from 'react';
import axios from 'axios'; // Add axios import
import { Upload, Play, Book, Dumbbell } from 'lucide-react';
import { predictPneumonia } from '../api';
import ChatbotCard from '../components/ChatbotCard';
import HospitalFinder from '../components/HospitalFinder';

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-amber-100 mb-8">Hello, it's great to see you</h1>
      </div>

      {/* Main Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Upload Card */}
        <div className="bg-amber-100/10 rounded-3xl p-6 backdrop-blur-sm">
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
        </div>

        {/* Side Cards */}
        <div className="space-y-6">
          {/* Learn Card */}
          <HospitalFinder />

          {/* Exercise Card */}
          <div className="bg-purple-400/20 rounded-3xl p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="bg-purple-400/30 p-3 rounded-xl">
                <Dumbbell className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Recovery Exercises</h3>
                <p className="text-sm text-gray-300">Recommended exercises for recovery</p>
              </div>
            </div>
          </div>

          {/* News Card */}
          <div className="bg-amber-100/10 rounded-3xl p-6 backdrop-blur-sm">
            <h3 className="font-semibold mb-4">Go to your profile</h3>
            <button className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors">
              <Play className="h-4 w-4" />
              <span>Take me now !!</span>
            </button>
          </div>
        </div>
      </div>
      <ChatbotCard />
    </div>
  );
};

export default HomePage;
