// components/NavBar.tsx

import Image from "next/image";
import { useState } from "react";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full fixed top-0 z-50 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-indigo-400 flex items-center">
            <Image src="/logo.png" alt="Logo" width={75} height={75} />
            <span className="ml-2">E-Crescendo</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {/* Original href links from the previous navbar */}
            <a href="/#home" className="text-white text-xl font-Poppins hover:text-indigo-400 transition transform hover:scale-110">
              Home
            </a>
            <a href="/#timeline" className="text-white font-Poppins text-xl hover:text-indigo-400 transition transform hover:scale-110">
              Timeline
            </a>
            <a href="/#instructions" className="text-white  font-Poppins text-xl hover:text-indigo-400 transition transform hover:scale-110">
              Instructions
            </a>
            <a href="/#apply" className="text-white font-Poppins text-xl hover:text-indigo-400 transition transform hover:scale-110">
              How to Apply
            </a>
            <a href="/#contact" className="text-white font-Poppins text-xl hover:text-indigo-400 transition transform hover:scale-110">
              Contact Us
            </a>
          </div>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-opacity-50 p-4 flex flex-col items-center">
          {/* Original href links from the previous navbar for mobile */}
          <a href="/#home" className="block font-Poppins my-2 text-2xl text-cyan-400 transition transform hover:scale-110">
            Home
          </a>
          <a href="/#timeline" className="block font-Poppins my-2 text-2xl text-cyan-400 transition transform hover:scale-110">
            Timeline
          </a>
          <a href="/#instructions" className="block font-Poppins my-2 text-2xl text-cyan-400 transition transform hover:scale-110">
            Instructions
          </a>
          <a href="/#apply" className="block font-Poppins my-2 text-2xl text-cyan-400 transition transform hover:scale-110">
            How to Apply
          </a>
          <a href="/#contact" className="block font-Poppins my-2 text-2xl text-cyan-400 transition transform hover:scale-110">
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
