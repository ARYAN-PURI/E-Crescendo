import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Welcome to <span className="text-indigo-400">E-Crescendo</span>
        </h1>
        <p className="text-md md:text-lg mb-12">
          Join the most exciting event of the year! By Registering Your Team!!
        </p>

        <div className="space-y-4 sm:space-y-0 sm:space-x-8 sm:flex justify-center flex-wrap">
          <Link href="/registrationForm">
            <div className="px-8 my-4 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg transform transition hover:bg-indigo-500 hover:scale-105 cursor-pointer">
              Fill Registration Form
            </div>
          </Link>
          <Link href="/EditResponseForm">
            <div className="px-8 my-4 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg transform transition hover:bg-blue-500 hover:scale-105 cursor-pointer">
              Edit Form
            </div>
          </Link>
          <Link href="/AdminPage">
            <div className="px-8 my-4 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg transform transition hover:bg-green-500 hover:scale-105 cursor-pointer">
              Admin Panel
            </div>
          </Link>
          <Link href="https://drive.google.com/drive/folders/1ScRvEIfU_QdZ1fFXGe4MLsqVfaa-zCpv?usp=drive_link">
            <div className="px-8 my-4 py-4 bg-gray-700 text-white font-bold rounded-lg shadow-lg transform transition hover:bg-gray-600 hover:scale-105 cursor-pointer">
              GuideLines
            </div>
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-4 text-gray-400">
        <p>Powered by E-Crescendo Team &copy; 2024</p>
      </footer>
    </div>
  );
}
