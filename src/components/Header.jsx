
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react'; // Example Icon

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-violet-600">
          <Briefcase size={28} />
          <span>ModernSite</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-violet-600 transition-colors">Home</Link>
          {/* Add more nav links here if needed */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
