import React from 'react';

const RecoveryVideos = () => {
    const videos = [
        'https://www.youtube.com/embed/8VMw9LlAevk',
        'https://www.youtube.com/embed/k85C8uJmrkc',
        'https://www.youtube.com/embed/DBuPbYjPpao',
        'https://www.youtube.com/embed/hRW7UUzxYzw',
        'https://www.youtube.com/embed/iIrAUL_VmiU',
        'https://www.youtube.com/embed/ixx43GN5pL8',
        'https://www.youtube.com/embed/Zq1bVQ7875c',
        'https://www.youtube.com/embed/m_4CGZzTTCo',
        'https://www.youtube.com/embed/dpTNUGwXbTU',
      ];
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Recovery Exercise Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((videoUrl, index) => (
          <div key={index} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="200"
              src={videoUrl}
              title={`Recovery Exercise Video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecoveryVideos;
