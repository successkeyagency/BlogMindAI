import React, { useState, useEffect, useRef } from 'react';

const images = [
  {
    id: 1,
    title: 'Beautiful Landscape',
    url: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
  },
  {
    id: 2,
    title: 'City Skyline',
    url: 'https://images.pexels.com/photos/13027119/pexels-photo-13027119.jpeg',
  },
  {
    id: 3,
    title: 'Sunset Beach',
    url: 'https://images.pexels.com/photos/4306936/pexels-photo-4306936.jpeg',
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 7000;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, delay);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const goToSlide = (index) => {
    setCurrent(index);
    clearTimeout(timeoutRef.current);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
    clearTimeout(timeoutRef.current);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
    clearTimeout(timeoutRef.current);
  };

  return (
    <section className="bg-white pt-12 pb-5 lg:pb-5 px-6 sm:px-10 xl:px-32 text-gray-800">
<h2 className="text-3xl font-bold mb-8 text-center">🌿 Whispers of Earth</h2>

      <div className="flex flex-col lg:flex-row items-start gap-8 justify-center">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-lg shadow-lg">
          <img
            src={`${images[current].url}?auto=compress&cs=tinysrgb&dpr=2&h=400&w=800`}
            alt={images[current].title}
            className="w-full h-80 object-cover transition-opacity duration-700"
          />

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-opacity-80"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-opacity-80"
          >
            ›
          </button>

          <div className="flex justify-center mt-4 space-x-3 absolute bottom-2 left-1/2 transform -translate-x-1/2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === current ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-sm p-4 bg-white/20 border border-gray-300/40 rounded-xl shadow-lg backdrop-blur-sm">
  <div className="chat-move flex flex-col space-y-2 text-sm font-mono text-gray-900">
    <div className="chat-bubble self-start bg-black/10 px-3 py-2 rounded-lg max-w-[90%]">
      "Have you ever seen the sunrise over the Sahara?"
    </div>
    <div className="chat-bubble self-end bg-black/15 px-3 py-2 rounded-lg max-w-[85%]">
      "Or watched the Northern Lights dance across the Arctic sky?"
    </div>
    <div className="chat-bubble self-start bg-black/10 px-3 py-2 rounded-lg max-w-[90%]">
      "The deep blues of the Maldives feel like another world."
    </div>
    <div className="chat-bubble self-end bg-black/15 px-3 py-2 rounded-lg max-w-[80%]">
      "Even the quiet of a misty forest is a kind of magic."
    </div>
    <div className="chat-bubble self-start bg-black/10 px-3 py-2 rounded-lg max-w-[90%]">
      "Earth’s beauty is a reminder—we live in a masterpiece."
    </div>
  </div>
</div>

      </div>

      <style>{`
        @keyframes slide-left-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(15px); }
        }
        .chat-move > div {
          animation: slide-left-right 6s ease-in-out infinite;
        }
        .chat-move > div:nth-child(2n) {
          animation-delay: 0.3s;
        }
        .chat-move > div:nth-child(3n) {
          animation-delay: 0.6s;
        }
        .chat-move > div:nth-child(4n) {
          animation-delay: 0.9s;
        }
        .chat-move > div:nth-child(5n) {
          animation-delay: 1.2s;
        }
      `}</style>
    </section>
  );
};

export default ImageSlider;
