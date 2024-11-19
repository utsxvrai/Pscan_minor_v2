import React, { useState } from 'react';
import { MapPin, Loader, RefreshCw } from 'lucide-react';

const HospitalFinder = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRefresh, setShowRefresh] = useState(false); // To control the visibility of the refresh icon
  const [isFadingOut, setIsFadingOut] = useState(false); // To handle fade-out animation

  const findNearbyHospitals = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longitude},${latitude},5000&limit=5&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`
      );
      const data = await response.json();
      setHospitals(data.features || []);
      setShowRefresh(true); // Show refresh when hospitals are listed
    } catch (err) {
      setError('Failed to fetch nearby hospitals');
    }
    setIsLoading(false);
  };

  const handleGetLocation = () => {
    setIsLoading(true);
    setError(null);
    setHospitals([]); // Clear hospitals when fetching new data

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        findNearbyHospitals(latitude, longitude);
      },
      () => {
        setError('Unable to retrieve your location');
        setIsLoading(false);
      }
    );
  };

  const handleRefresh = () => {
    setIsFadingOut(true); // Trigger fade-out animation
    setTimeout(() => {
      // After fade-out, reset the state
      setHospitals([]);
      setLocation(null);
      setError(null);
      setIsFadingOut(false); // Reset fading state
      setShowRefresh(false); // Hide the refresh icon
    }, 500); // Duration of the fade-out animation
  };

  return (
    <div className="bg-blue-400/20 rounded-3xl p-6 backdrop-blur-sm relative">
      <div className="flex items-start gap-4">
        <div className="bg-blue-400/30 p-3 rounded-xl">
          <MapPin className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2 text-white">Find Hospitals Nearby</h3>
          <p className="text-sm text-gray-300 mb-4">
            Locate the nearest hospitals for pneumonia treatment.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={handleGetLocation}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
              <span>{isLoading ? 'Locating...' : 'Find Nearby Hospitals'}</span>
            </button>

            {/* Refresh Icon */}
            {showRefresh && (
              <div
                onClick={!isFadingOut ? handleRefresh : null}
                className={`p-2 bg-blue-500/30 rounded-full cursor-pointer hover:bg-blue-500/50 transition-colors ${
                  isFadingOut ? 'opacity-0 transition-opacity duration-500' : 'opacity-100'
                }`}
                title="Refresh"
              >
                <RefreshCw className={`h-5 w-5 text-white ${isFadingOut ? 'animate-spin' : ''}`} />
              </div>
            )}
          </div>

          {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}

          {hospitals.length > 0 && (
            <div
              className="mt-4 max-h-40 overflow-y-scroll space-y-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-300 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#60a5fa #dbeafe',
              }}
            >
              {hospitals.map((hospital, index) => (
                <div
                  key={index}
                  className="bg-blue-500/20 p-2 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                >
                  <p className="font-medium text-white">{hospital.properties.name}</p>
                  <p className="text-gray-300 text-xs">{hospital.properties.address_line2}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalFinder;
