import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, Image, MessageSquare } from 'lucide-react';

const Profile = () => {
  const { logout, userName } = useAuth();

  // Manually added scan history for testing
  const scanHistory = [
    {
      imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
      prediction: 'Pneumonia Detected',
      date: '2024-11-17',
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      prediction: 'Normal',
      date: '2024-11-16',
    },
  ];

  // Manually added chat history for testing
  const chatHistory = [
    {
      message: 'What are the symptoms of pneumonia?',
      timestamp: '2024-11-15T14:30:00Z',
    },
    {
      message: 'How do I recover quickly?',
      timestamp: '2024-11-16T10:00:00Z',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userName || 'User'}</h1>
          <p className="text-blue-100">View your scan history and chat interactions</p>
          <button
            onClick={() => logout()}
            className="mt-4 bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Scan History */}
          <div className="bg-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Image className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Scan History</h2>
            </div>
            <div className="space-y-4">
              {scanHistory.map((scan, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <img
                    src={scan.imageUrl}
                    alt={`Scan ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm text-gray-300">{scan.prediction}</p>
                  <p className="text-xs text-gray-400">{new Date(scan.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat History */}
          <div className="bg-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Chat History</h2>
            </div>
            <div className="space-y-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm">{chat.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(chat.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
