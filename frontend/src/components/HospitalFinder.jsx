import React, { useState, useEffect } from 'react';
import { MapPin, Loader } from 'lucide-react';

const HospitalFinder = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const findNearbyHospitals = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longitude},${latitude},5000&limit=5&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`
      );
      const data = await response.json();
      setHospitals(data.features || []);
    } catch (err) {
      setError('Failed to fetch nearby hospitals');
    }
    setIsLoading(false);
  };

  const handleGetLocation = () => {
    setIsLoading(true);
    setError(null);

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

  return (
    <div className="bg-blue-400/20 rounded-3xl p-6 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="bg-blue-400/30 p-3 rounded-xl">
          <MapPin className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2">Find Hospitals Nearby</h3>
          <p className="text-sm text-gray-300 mb-4">
            Locate the nearest hospitals for pneumonia treatment
          </p>
          
          <button
            onClick={handleGetLocation}
            className="flex items-center gap-2 bg-blue-500/30 rounded-lg px-4 py-2 hover:bg-blue-500/40 transition-colors"
          >
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
            <span>Find Nearby Hospitals</span>
          </button>

          {error && (
            <p className="mt-2 text-red-400 text-sm">{error}</p>
          )}

          {hospitals.length > 0 && (
            <div className="mt-4 space-y-2">
              {hospitals.map((hospital, index) => (
                <div key={index} className="bg-blue-500/20 p-2 rounded-lg text-sm">
                  <p className="font-medium">{hospital.properties.name}</p>
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