import React, { useState } from 'react';
import '../styles/RouletteButton.css';

const RouletteButton = ({ onClick }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000); // Reset after animation
    onClick();
  };

  return (
    <button 
      className={`roulette-button ${isSpinning ? 'spin' : ''}`} 
      onClick={handleClick}
    >
      Spin the Roulette!
    </button>
  );
};

export default RouletteButton;