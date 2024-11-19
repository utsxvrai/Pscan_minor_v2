import React from 'react';

const Exercises = () => {
  // Manually define videos with titles and descriptions
  const videos = [
    {
      url: 'https://www.youtube.com/embed/8VMw9LlAevk',
      title: 'Deep Breathing Exercises',
      description: 'Improve lung capacity and ease breathing with guided deep breathing techniques.',
    },
    {
      url: 'https://www.youtube.com/embed/k85C8uJmrkc',
      title: 'Posture Improvement Exercises',
      description: 'Learn simple exercises to correct posture and support respiratory health.',
    },
    {
      url: 'https://www.youtube.com/embed/DBuPbYjPpao',
      title: 'Pneumonia Recovery Stretches',
      description: 'Gentle stretches designed to help you recover from pneumonia effectively.',
    },
    {
      url: 'https://www.youtube.com/embed/hRW7UUzxYzw',
      title: 'Chest Physiotherapy Techniques',
      description: 'Techniques to clear mucus and improve lung function during recovery.',
    },
    {
      url: 'https://www.youtube.com/embed/iIrAUL_VmiU',
      title: 'Relaxation and Breathing',
      description: 'Combine relaxation methods with breathing exercises for holistic recovery.',
    },
    {
      url: 'https://www.youtube.com/embed/ixx43GN5pL8',
      title: 'Strengthening Core Muscles',
      description: 'Strengthen core muscles to aid overall respiratory health and support breathing.',
    },
    {
      url: 'https://www.youtube.com/embed/Zq1bVQ7875c',
      title: 'Yoga for Respiratory Health',
      description: 'Gentle yoga exercises tailored for improving lung function and overall relaxation.',
    },
    {
      url: 'https://www.youtube.com/embed/m_4CGZzTTCo',
      title: 'Guided Meditation',
      description: 'Reduce stress and promote healing with guided meditation techniques.',
    },
    {
      url: 'https://www.youtube.com/embed/dpTNUGwXbTU',
      title: 'Upper Body Mobility Exercises',
      description: 'Exercises designed to improve upper body mobility and ease breathing discomfort.',
    },
    {
      url: 'https://www.youtube.com/embed/zpOULjyy-n8',
      title: 'Aerobic Recovery for Lungs',
      description: 'Low-impact aerobic exercises to support your pneumonia recovery journey.',
    },
    {
      url: 'https://www.youtube.com/embed/Sjk6lfFZOP4',
      title: 'Stretch and Relax',
      description: 'Gentle stretching exercises to relieve tension and enhance respiratory recovery.',
    },
    {
      url: 'https://www.youtube.com/embed/qzM0G6dQ6KU',
      title: 'Breathing Techniques for Sleep',
      description: 'Techniques to enhance breathing and promote restful sleep during recovery.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-amber-100 mb-8 text-center">
          Pneumonia Recovery Exercises
        </h1>

        {/* Video Cards */}
        {videos.map((video, index) => (
          <div
            key={index}
            className="flex items-center gap-6 bg-gray-800 rounded-lg p-6 shadow-lg hover:scale-105 transition-transform"
          >
            {/* Video Embed */}
            <div className="flex-shrink-0 w-40 h-28 md:w-60 md:h-36">
              <iframe
                width="100%"
                height="100%"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>

            {/* Video Details */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
              <p className="text-sm text-gray-300 mb-4">{video.description}</p>
              <button
                onClick={() =>
                  window.open(video.url.replace('embed/', 'watch?v='), '_blank')
                }
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-lg text-sm"
              >
                Watch on YouTube
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
