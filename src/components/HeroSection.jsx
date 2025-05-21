
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-20 px-4 rounded-lg shadow-xl mb-12">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-md">Welcome to ModernSite</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Discover amazing content, interact with dynamic features, and explore a new generation of web experience.
        </p>
        <button className="bg-white text-violet-700 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
