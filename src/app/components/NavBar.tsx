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
          <div
            className="text-2xl font-bold text-indigo-400 flex items-center cursor-pointer"
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
            />
          <a href="./guidelines/E-CrescendoBrochure.pdf" download="E-Crescendo ecell-nith 2024 Brochure">
            <span className="ml-2">E-Crescendo</span>
          </a>
          </div>

          <div className="hidden xl:flex space-x-8">
            <a href="/#home" className="text-white text-xl font-Poppins hover:text-indigo-400 transition transform hover:scale-110">
              Home
            </a>
            <a href="/#timeline" className="text-white font-Poppins text-xl hover:text-indigo-400 transition transform hover:scale-110">
              Timeline
            </a>
            <a href="/#instructions" className="text-white font-Poppins text-xl hover:text-indigo-400 transition transform hover:scale-110">
              Instructions
            </a>
            <a href="/#apply" className="text-white font-Poppins text-xl hover:text-indigo-400 transition transform hover:scale-110">
              How to Apply
            </a>
            <a href="/#contact" className="text-white font-Poppins text-xl hover:text-indigo-400 transition transform hover:scale-110">
              Contact Us
            </a>
            <a href="/AdminPage" className="text-white font-Poppins text-xl hover:text-indigo-400 transition transform hover:scale-110">
              Admin Panel
            </a>
          </div>
          <button className="xl:hidden text-white" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`xl:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="bg-opacity-50 p-4 flex flex-col items-center z-50">
          <a href="/#home" className="block font-Poppins my-2 text-2xl hover:text-indigo-400 text-white transition transform hover:scale-110" onClick={toggleMenu}>
            Home
          </a>
          <a href="/#timeline" className="block font-Poppins my-2 text-2xl hover:text-indigo-400 text-white transition transform hover:scale-110" onClick={toggleMenu}>
            Timeline
          </a>
          <a href="/#instructions" className="block font-Poppins my-2 text-2xl hover:text-indigo-400 text-white transition transform hover:scale-110" onClick={toggleMenu}>
            Instructions
          </a>
          <a href="/#apply" className="block font-Poppins my-2 text-2xl hover:text-indigo-400 text-white transition transform hover:scale-110" onClick={toggleMenu}>
            How to Apply
          </a>
          <a href="/#contact" className="block font-Poppins my-2 text-2xl hover:text-indigo-400 text-white transition transform hover:scale-110" onClick={toggleMenu}>
            Contact Us
          </a>
          <a href="/AdminPage" className="block font-Poppins my-2 text-2xl hover:text-indigo-400 text-white transition transform hover:scale-110" onClick={toggleMenu}>
            Admin Panel
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
