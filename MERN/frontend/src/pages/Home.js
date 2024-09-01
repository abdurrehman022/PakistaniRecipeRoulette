import React, { useEffect, useState } from 'react';
import IntroductionSection from '../components/IntroductionSection';
import RouletteIntroSection from '../components/RouletteIntroSection';
import TopRecipesSection from '../components/TopRecipesSection';
import AboutUsSection from '../components/AboutUsSection';

const Home = () => {
  return (
    <div>
      <IntroductionSection />
      <RouletteIntroSection />
      <TopRecipesSection />
      <AboutUsSection />
    </div>
  );
};

export default Home;