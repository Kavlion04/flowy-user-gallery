
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 text-center"> {/* Increased py-8 to py-12 */}
      <div className="container mx-auto px-4">
        <p className="text-lg">&copy; {currentYear} ModernSite. All rights reserved.</p> {/* Increased font size */}
        <p className="mt-3 text-base"> {/* Increased mt-2 to mt-3 and font size */}
          Built with <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400">React</a> & <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400">Tailwind CSS</a> by Lovable.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
