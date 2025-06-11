import React, { useState, useEffect } from 'react';

const Spotlight = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 1025);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    const handleResize = () => {
      setIsVisible(window.innerWidth >= 768);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isVisible) return null; 

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          transformOrigin: 'center',
          fontSize: '32px',
          filter: 'drop-shadow(0 0 5px #38bdf8)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 10000,

          transition: clicked
            ? 'transform 0.15s ease-out'
            : 'transform 0.3s ease-in-out',

          transform: clicked
            ? `translate(-50%, -50%) scale(1.5) rotate(15deg)`
            : 'translate(-50%, -50%) scale(1) rotate(0deg)',
        }}
      >
        🚀
      </div>
    </>
  );
};

export default Spotlight;
