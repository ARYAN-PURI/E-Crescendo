import Image from "next/image";
export default function NavBar(){
    return (
        <nav className="w-full bg-black bg-opacity-50 fixed top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-indigo-400 flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={75}
                height={75}
              />
              E-Crescendo
            </div>
            <div className="space-x-8 hidden md:flex">
              <a href="/#home" className="text-white text-xl hover:text-indigo-400 transition">Home</a>
              <a href="/#timeline" className="text-white text-xl hover:text-indigo-400 transition">Timeline</a>
              <a href="/#instructions" className="text-white text-xl hover:text-indigo-400 transition">Instructions</a>
              <a href="/#apply" className="text-white text-xl hover:text-indigo-400 transition">How to Apply</a>
              <a href="/#contact" className="text-white text-xl hover:text-indigo-400 transition">Contact Us</a>
            </div>
          </div>
        </div>
      </nav>
    );
}