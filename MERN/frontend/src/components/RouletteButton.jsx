import React from 'react';
import '../styles/RouletteButton.css';

const RouletteButton = ({ onClick }) => {
  return (
    <button className="roulette-button" onClick={onClick}>
      Spin the Roulette!
    </button>
  );
};

export default RouletteButton;
