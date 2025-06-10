import React, { useState, useEffect } from 'react';

const Spotlight = () => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none',
        background: `radial-gradient(circle 150px at ${position.x}px ${position.y}px, rgba(255,255,255,0.3), transparent 80%)`,
        mixBlendMode: 'screen',
        transition: 'background-position 0.1s ease',
        zIndex: 9999,
      }}
    />
  );
};

export default Spotlight;
