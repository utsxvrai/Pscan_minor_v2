// LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ size = "size-8" }) => {
  return (
    <div className={`animate-spin inline-block ${size} border-[3px] border-current border-t-transparent text-blue-600 rounded-full`} role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
