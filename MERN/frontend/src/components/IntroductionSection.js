import React from 'react';
import '../styles/IntroductionSection.css';
import backgroundImage from '../assets/background1.jpg';

const IntroductionSection = () => {
  return (
    <section className="introduction-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="intro-content">
        <h1>Welcome to Pakistani Recipe Roulette!</h1>
        <p>
          Immerse yourself in the vibrant world of Pakistani cuisine. With our Recipe Roulette, 
          you can explore a diverse array of recipes from different regions of Pakistan. 
          Whether you're a culinary novice or a seasoned chef, there's something here for everyone.
        </p>
        <p>
          From spicy curries to delightful desserts, our collection brings you authentic flavors 
          and traditional dishes that you can easily prepare at home. Spin the roulette and 
          discover your next favorite recipe!
        </p>
        <a href="/recipes" className="btn-primary">Explore Recipes</a>
      </div>
    </section>
  );
};

export default IntroductionSection;