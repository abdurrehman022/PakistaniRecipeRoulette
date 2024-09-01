import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import '../styles/RouletteIntroSection.css';

const RouletteIntroSection = () => {
  return (
    <section className="roulette-intro-section">
      <div className="roulette-content">
        <h2>Discover Your Next Favorite Recipe</h2>
        <p>
          The Recipe Roulette is your gateway to exploring a new and exciting recipe every time you spin the wheel. 
          Simply enter the ingredients you have, and let the roulette decide what delicious Pakistani dish you can 
          cook today. It’s fun, easy, and the perfect way to spice up your meal planning!
        </p>
        <Link to="/roulette" className="btn-primary">Try the Roulette</Link>
      </div>
    </section>
  );
};

export default RouletteIntroSection;