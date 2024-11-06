'use client';
import Link from "next/link";
import { useState } from "react";
import axios from 'axios';
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import RotatingText from "./components/RotatingText";
import Image from "next/image";
export default function Home() {
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    query: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [contactNO, setContact] = useState('');
  async function sendQuery() {
    setLoading(true);
    if (data.name == "" || data.mobile.length !== 10 || data.email == "" || data.query == "") {

      setError("Fill the Fields First");
      console.log(data);
    } else {
      try {
        const result = await axios.post('/api/sendQuery', data);
        if (!result.data.success) {
          setError('The Error Has Been Occured While Submitting Query')
        }
        else {
          setError("");
        }
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setData({
          name: "",
          mobile: "",
          email: "",
          query: ""
        });
      }
    }
    setLoading(false);

  }
  return (
    <div className="bg-gradient-to-br  from-gray-700 via-gray-800 to-black">
    <div className="min-h-screen flex flex-col md:bg-[url('/bgimage.png')] md:bg-fixed text-white md:bg-cover">
      <NavBar />
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 mt-20">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center">
          Welcome to <span className="text-indigo-400 text-nowrap">E-Crescendo</span>
        </h1>
        <div className="text-md md:text-lg mb-6 text-center ">
          <RotatingText />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <span className="text-fuchsia-200 text-3xl font-bold my-2">Organised By </span> <span className="text-fuchsia-200 text-3xl font-bold"> &nbsp; E-Cell NIT Hamirpur</span>
        </div>

        <div className="space-y-4 sm:space-y-0 sm:space-x-8 sm:flex justify-center flex-wrap">
          <Link href="/registrationForm">
            <Image
              className='transition-transform duration-300 rounded-lg shadow-lg hover:scale-105 my-4 hover:border-white hover:border-2'
              src='/register.png'
              alt="Fill Registration Form"
              width={250}
              height={200} />
          </Link>
          <Link href="/EditResponseForm">
            <Image
              className='transition-transform duration-300 rounded-lg shadow-lg hover:scale-105 my-4 hover:border-white hover:border-2'
              src='/edit.png'
              alt='Edit Form'
              width={250}
              height={200} />
          </Link>
          <a href="./guidelines/E-crescendo.pdf" download="E-Crescendo ecell-nith 2024 guidelines">
            <Image
              className=' transition-transform duration-300 rounded-lg shadow-lg hover:scale-105 my-4 hover:border-white hover:border-2'
              src='/guide.png'
              alt='guidelines'
              width={250}
              height={200} />
          </a>
          <div>
            <div>

            </div>

          </div>

        </div>
      </section>

      <section id="timeline" className="min-h-screen flex flex-col justify-center items-center px-4 mt-20">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-10 text-indigo-400 tracking-widest uppercase">Event Timeline</h2>
        <div className="relative max-w-7xl mx-auto border-l-4 border-indigo-500 pl-6 space-y-12">
          <div className="group timeline-item relative">
            <div className="absolute -left-5 top-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center transition-transform transform group-hover:scale-125 shadow-lg ">
            📅
            </div>
            <div className=" hover:border-white hover:border ml-8 p-6 bg-gradient-to-r to-[#5f4ff1] from-[#250f55] rounded-xl shadow-lg transition-transform transform group-hover:scale-105 group-hover:shadow-2xl duration-300">
              <h3 className="text-xl font-bold mb-2 text-[#fb6400] group-hover:text-[#40e1d1] transition-colors duration-300">REGISTRATION BEGINS</h3>
              <p className="font-semibold text-[#1fffa5]">15 October 2024</p>
              <p className="mt-2 text-yellow-300 font-Poppins">Your initial steps into the realm of developing a startup</p>
            </div>
          </div>

          <div className="group timeline-item relative">
            <div className="absolute -left-5 top-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center transition-transform transform group-hover:scale-125 shadow-lg">
              📅
            </div>
            <div className=" hover:border-white hover:border ml-8 p-6 bg-gradient-to-r to-[#5f4ff1] from-[#250f55] rounded-xl shadow-lg transition-transform transform group-hover:scale-105 group-hover:shadow-2xl duration-300">
              <h3 className="text-xl font-bold mb-2 text-[#fb6400] group-hover:text-[#40e1d1] transition-colors duration-300">REGISTRATION ENDS</h3>
              <p className="font-semibold text-[#1fffa5]">20 October 2024</p>
              <p className="mt-2 text-yellow-300 font-Poppins">Last date for submitting you application </p>
            </div>
          </div>

          <div className="group timeline-item relative">
            <div className="absolute -left-5 top-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center transition-transform transform group-hover:scale-125 shadow-lg">
              📅
            </div>
            <div className=" hover:border-white hover:border ml-8 p-6 bg-gradient-to-r to-[#5f4ff1] from-[#250f55] rounded-xl shadow-lg transition-transform transform group-hover:scale-105 group-hover:shadow-2xl duration-300">
              <h3 className="text-xl font-bold mb-2 text-[#fb6400] group-hover:text-[#40e1d1] transition-colors duration-300">INTERNAL SCREENING</h3>
              <p className="font-semibold text-[#1fffa5] font-Poppins">(Date to be Announced)</p>
              <p className="mt-2 text-yellow-300 font-Poppins">Shortlisting based on the worth of the idea and the caliber of the team members</p>
            </div>
          </div>

          <div className="group timeline-item relative">
            <div className="absolute -left-5 top-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center transition-transform transform group-hover:scale-125 shadow-lg">
              📅
            </div>
            <div className=" hover:border-white hover:border ml-8 p-6 bg-gradient-to-r to-[#5f4ff1] from-[#250f55] rounded-xl shadow-lg transition-transform transform group-hover:scale-105 group-hover:shadow-2xl duration-300">
              <h3 className="text-xl font-bold mb-2 text-[#fb6400] group-hover:text-[#40e1d1] transition-colors duration-300">FACULTY SCREENING</h3>
              <p className="font-semibold text-[#1fffa5] font-Poppins">(Date to be Announced)</p>
              <p className="mt-2 text-yellow-300 font-Poppins">The final pitch! Convince the faculties and woohoo, the funds are yours.</p>
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
              <li>Include your name, contact info and your Team Members Details.</li>
              <li>Mention your startup idea.</li>
              <li>Upload Your PPT on google drive and paste the link (make access of the link as public) in the form</li>
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
              <li>Clearly Specify the addressing problem and the budget of your project.</li>
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
              onChange={(e) => { setData({ ...data, name: e.target.value }); setError('') }}
            />
          </div>
          <div className="mb-6">

            <PhoneInput
              country={'in'} // Default country
              value={contactNO}
              onChange={(phone: string) => {
                if (phone.length === 12) {
                  data.mobile = phone.substring(2);
                }
                else {
                  setContact(phone)
                  data.mobile = phone
                }
                setError('')

              }}
              inputProps={{
                name: 'contactNo',
                required: true,
                autoFocus: false,
              }}
              containerClass="w-full"
              inputStyle={{
                paddingLeft: '3rem', // Space between flag and number
                paddingRight: '1rem', // Space between number and container edge
                width: '100%',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #6b7280', // Matches border-gray-500
                borderRadius: '0',
                backgroundColor: 'transparent',
                color: '',
                outline: 'none',

                transition: 'box-shadow 0.2s ease-in-out',
              }}
              buttonStyle={{
                border: 'none',
                background: 'transparent',
              }}
              dropdownStyle={{
                zIndex: 999,
              }}
            />
          </div>

          <div className="mb-6">
            <input
              className="w-full p-2 border-b border-gray-500 bg-transparent text-white focus:outline-none focus:border-indigo-500 focus:ring-0"
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => { setData({ ...data, email: e.target.value }); setError('') }}
            />
          </div>

          <div className="mb-6">
            <textarea
              className="w-full p-2 border-b border-gray-500 bg-transparent text-white focus:outline-none focus:border-indigo-500 focus:ring-0"
              id="query"
              placeholder="Write your query"
              value={data.query}
              onChange={(e) => { setData({ ...data, query: e.target.value }); setError('') }}
              rows={2}
            ></textarea>
          </div>

          <div className="flex flex-col items-center justify-center">
            {
              loading ?
                <button
                  className="w-full my-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-500 transition-colors duration-300"
                >
                  Submitting...
                </button>
                :
                <button
                  onClick={sendQuery}
                  className="w-full my-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-500 transition-colors duration-300"
                >
                  Submit
                </button>
            }
            {
              error !== "" ?
                <div className={"font-bold p-4 rounded-lg text-red-600 bg-white-100"}>{error}</div>
                :
                null
            }
          </div>
        </div>
      </section>
      <Footer />
    </div>
    </div>
  );
}
