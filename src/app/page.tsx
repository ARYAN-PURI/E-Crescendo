'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from 'axios';
export default function Home() {
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    query: ""
  });
  const [error,setError]=useState("");
  const [loading, setLoading] = useState(false);
  async function sendQuery() {
    setLoading(true);
    try{
      const result=await axios.post('/api/sendQuery',data);
      if(!result.data.success){
        setError('The Error Has Been Occured While Submitting Query')
      }
      else{
        setError("");
      }
    }
    catch(error){
      console.log(error);
    }
    finally {
      setData({
        name: "",
        mobile: "",
        email: "",
        query: ""
      });
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white">
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
              <a href="#home" className="text-white text-xl hover:text-indigo-400 transition">Home</a>
              <a href="#timeline" className="text-white text-xl hover:text-indigo-400 transition">Timeline</a>
              <a href="#instructions" className="text-white text-xl hover:text-indigo-400 transition">Instructions</a>
              <a href="#apply" className="text-white text-xl hover:text-indigo-400 transition">How to Apply</a>
              <a href="#contact" className="text-white text-xl hover:text-indigo-400 transition">Contact Us</a>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 mt-20">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center">
          Welcome to <span className="text-indigo-400">E-Crescendo</span>
        </h1>
        <p className="text-md md:text-lg mb-12 text-center">
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
              Guidelines
            </div>
          </Link>
        </div>
      </section>

      <section id="timeline" className="min-h-screen flex flex-col justify-center items-center px-4 mt-20">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-10 text-indigo-400 tracking-widest uppercase">Event Timeline</h2>
        <div className="relative max-w-7xl mx-auto border-l-4 border-indigo-500 pl-6 space-y-12">
          <div className="group timeline-item relative">
            <div className="absolute -left-5 top-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center transition-transform transform group-hover:scale-125 shadow-lg ">
              📅
            </div>
            <div className=" hover:border-white hover:border ml-8 p-6 bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-xl shadow-lg transition-transform transform group-hover:scale-105 group-hover:shadow-2xl duration-300">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-200 transition-colors duration-300">REGISTRATION BEGINS</h3>
              <p className="font-semibold text-indigo-200">22nd September, 2024</p>
              <p className="mt-2 text-gray-300">Your initial steps into the realm of developing a startup</p>
            </div>
          </div>

          <div className="group timeline-item relative">
            <div className="absolute -left-5 top-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center transition-transform transform group-hover:scale-125 shadow-lg">
              📅
            </div>
            <div className=" hover:border-white hover:border ml-8 p-6 bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-xl shadow-lg transition-transform transform group-hover:scale-105 group-hover:shadow-2xl duration-300">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-200 transition-colors duration-300">INTERNAL SCREENING</h3>
              <p className="font-semibold text-indigo-200">(Date to be Announced)</p>
              <p className="mt-2 text-gray-300">Shortlisting based on the worth of the idea and the caliber of the team members</p>
            </div>
          </div>

          <div className="group timeline-item relative">
            <div className="absolute -left-5 top-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center transition-transform transform group-hover:scale-125 shadow-lg">
              📅
            </div>
            <div className=" hover:border-white hover:border ml-8 p-6 bg-gradient-to-r from-indigo-700 to-indigo-500 rounded-xl shadow-lg transition-transform transform group-hover:scale-105 group-hover:shadow-2xl duration-300">
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-200 transition-colors duration-300">FACULTY SCREENING</h3>
              <p className="font-semibold text-indigo-200">(Date to be Announced)</p>
              <p className="mt-2 text-gray-300">The final pitch! Convince the faculties and woohoo, the funds are yours.</p>
            </div>
          </div>
        </div>
      </section>


      <div id="instructions" className="min-h-screen flex flex-col items-center justify-center px-4 mt-20">
        <h2 className="text-3xl font-bold mb-6 text-indigo-400 text-center">Instructions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="hover:border-white hover:border bg-gradient-to-br from-gray-800 to-gray-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="bg-indigo-500 text-white rounded-full p-2">
                📊
              </span>
              <h3 className="ml-4 text-xl font-bold text-indigo-300">Presentation Format</h3>
            </div>
            <ul className="list-disc list-inside text-gray-300 space-y-2 pl-2">
              <li>Use clear and concise language.</li>
              <li>Include visuals, graphs, or prototypes.</li>
              <li>Highlight unique aspects of your project.</li>
            </ul>
          </div>

          <div className=" hover:border-white hover:border bg-gradient-to-br from-gray-800 to-gray-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="bg-yellow-500 text-white rounded-full p-2">
                📝
              </span>
              <h3 className="ml-4 text-xl font-bold text-yellow-300">Project Proposal</h3>
            </div>
            <ul className="list-disc list-inside text-gray-300 space-y-2 pl-2">
              <li>Clearly state the problem your project addresses.</li>
              <li>Define your target audience and market.</li>
              <li>Outline the solution and innovation.</li>
            </ul>
          </div>

          <div className=" hover:border-white hover:border bg-gradient-to-br from-gray-800 to-gray-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="bg-green-500 text-white rounded-full p-2">
                💰
              </span>
              <h3 className="ml-4 text-xl font-bold text-green-300">Funding Request</h3>
            </div>
            <ul className="list-disc list-inside text-gray-300 space-y-2 pl-2">
              <li>State the required funding (up to ₹30,000).</li>
              <li>Break down how funds will be utilized.</li>
              <li>Justify financial support needed.</li>
            </ul>
          </div>
        </div>
      </div>


      <div id="apply" className="min-h-screen flex flex-col items-center justify-center px-4 mt-20">
        <h2 className="text-3xl font-bold mb-6 text-indigo-400 text-center">How to Apply</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className=" hover:border-white hover:border bg-gradient-to-br from-blue-800 to-blue-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="bg-blue-500 text-white rounded-full p-2">
                🖊️
              </span>
              <h3 className="ml-4 text-xl font-bold text-blue-300">Step 1: Registration</h3>
            </div>
            <ul className="list-disc list-inside text-white text-lg space-y-2 pl-2">
              <li>Register on the official website of E-Crescendo.</li>
              <li>Include your name, contact info, and academic details.</li>
              <li>Mention your startup idea.</li>
              <li>Registration must be completed by the team leader.</li>
            </ul>
          </div>

          <div className=" hover:border-white hover:border bg-gradient-to-br from-purple-800 to-purple-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="bg-purple-500 text-white rounded-full p-2">
                🖥️
              </span>
              <h3 className="ml-4 text-xl font-bold text-purple-300">Step 2: Project Submission</h3>
            </div>
            <ul className="list-disc list-inside text-white text-lg space-y-2 pl-2">
              <li>Submit a comprehensive project proposal.</li>
              <li>Clearly outline innovation, market potential, and impact.</li>
              <li>Include preliminary work or prototypes, if available.</li>
              <li>Projects can be from any domain (technical or non-technical).</li>
            </ul>
          </div>
        </div>
      </div>

      <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-4 mt-20">
  <h2 className="text-4xl font-extrabold mb-10 text-indigo-400 tracking-widest uppercase">Contact Us</h2>
  <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg">
    <div className="mb-6">
      <input
        className="w-full p-2 border-b border-gray-500 bg-transparent text-white focus:outline-none focus:border-indigo-500 focus:ring-0"
        type="text"
        placeholder="Enter your name"
        value={data.name}
        onChange={(e) => { setData({ ...data, name: e.target.value }) }}
      />
    </div>

    <div className="mb-6">
      <input
        className="w-full p-2 border-b border-gray-500 bg-transparent text-white focus:outline-none focus:border-indigo-500 focus:ring-0"
        type="number"
        placeholder="Enter your phone number"
        value={data.mobile}
        onChange={(e) => { setData({ ...data, mobile: e.target.value }) }}
      />
    </div>

    <div className="mb-6">
      <input
        className="w-full p-2 border-b border-gray-500 bg-transparent text-white focus:outline-none focus:border-indigo-500 focus:ring-0"
        type="email"
        placeholder="Enter your email"
        value={data.email}
        onChange={(e) => { setData({ ...data, email: e.target.value }) }}
      />
    </div>

    <div className="mb-6">
      <textarea
        className="w-full p-2 border-b border-gray-500 bg-transparent text-white focus:outline-none focus:border-indigo-500 focus:ring-0"
        id="query"
        placeholder="Write your query"
        value={data.query}
        onChange={(e) => { setData({ ...data, query: e.target.value }) }}
        rows="2"
      ></textarea>
    </div>

    <div className="flex items-center justify-center">
      {
        loading ?
          <button
            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-500 transition-colors duration-300"
          >
            Submitting...
          </button>
          :
          <button
            onClick={sendQuery}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-500 transition-colors duration-300"
          >
            Submit
          </button>
      }
      {
        error !== "" ?
          <div className={"text-sm font-medium p-2 rounded-lg text-red-600 bg-red-100"}>{error}</div>
          :
          null
      }
    </div>
  </div>
</section>



      <footer className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex space-x-8 justify-center items-center">
              <img src="/logo.png" alt="Sponsor 1" className="h-12 transform rounded-lg hover:scale-110" />
              <img src="/ecell.png" alt="Sponsor 2" className="h-20 transform rounded-lg hover:scale-110" />
            </div>
            <div className="text-center text-gray-300">
              <p>Powered By Team E-Cell &copy; 2024</p>
              <p>Creating Future Innovators</p>
            </div>
            <div className="flex space-x-6 justify-center">
              <a href="https://www.facebook.com/eclubnith/" className="rounded-3xl hover:scale-110">
                <Image
                  src="/facebook.png"
                  alt="Logo"
                  width={35}
                  height={35}
                />
              </a>
              <a href="https://x.com/ecellnith?lang=en&mx=2" className="rounded-3xl hover:scale-110">
                <Image
                  src="/twitter.svg"
                  alt="Logo"
                  width={35}
                  height={35}
                />
              </a>
              <a href="https://www.linkedin.com/company/entrepreneurshipcellnith/?originalSubdomain=in" className="rounded-3xl hover:scale-110">
                <Image
                  src="/linkdin.webp"
                  alt="Logo"
                  width={35}
                  height={35}
                />
              </a>
              <a href="mailto:entrepreneurshipcellnith@gmail.com" className="rounded-3xl hover:scale-110">
                <Image
                  src="/gmail.svg"
                  alt="Logo"
                  width={35}
                  height={35}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
