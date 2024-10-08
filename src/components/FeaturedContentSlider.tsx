import React, { useState, useEffect } from 'react';

const FeaturedContentSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { title: 'Featured Games', image: 'https://media.giphy.com/media/JdFEeta1hLNnO/giphy.gif', description: 'Discover new and exciting games!' },
    { title: 'Top Music Hits', image: 'https://media.giphy.com/media/tqfS3mgQU28ko/giphy.gif', description: 'Listen to the hottest tracks!' },
    { title: 'Stunning Artworks', image: 'https://media.giphy.com/media/3o6Zt7NPnoGorOryHC/giphy.gif', description: 'Explore breathtaking art pieces!' },
    { title: 'Must-Watch Movies', image: 'https://media.giphy.com/media/UDjF1zMreMld6/giphy.gif', description: 'Check out the latest blockbusters!' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedContentSlider;
