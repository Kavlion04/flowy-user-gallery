
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 text-center">
      <div className="container mx-auto px-4">
        <p>&copy; {currentYear} ModernSite. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Built with <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400">React</a> & <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400">Tailwind CSS</a> by Lovable.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
