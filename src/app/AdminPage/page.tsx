"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function AdminPage() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCorrect, setIsCorrect] = useState(false);
    const colorClasses = ['text-red-400', 'text-red-500', 'text-red-600', 'text-red-700', 'text-red-800', 'text-red-900'];
    const [user, setUser] = useState({
        userName: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleLogin() {
        if (user.userName === process.env.NEXT_PUBLIC_USER_NAME && user.password === process.env.NEXT_PUBLIC_PASSWORD) {
            setIsCorrect(true);
            setError("");
        } else {
            setError('Invalid Admin Credentials');
        }
    }

    async function getData() {
        try {
            const result = await axios.get(`/api/getData`);
            console.log(result);
            setData(result.data.res);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            {!isCorrect ? (
                <div className="flex items-center flex-col justify-between bg-gradient-to-br from-gray-700 via-gray-900 to-black min-h-screen">
                    <NavBar />
                    <div className='px-3'>
                        <div className="bg-white p-6 rounded-lg shadow-md w-[93vw] sm:w-96 my-[70%] sm:my-[60%] lg:my-[55%]">
                            <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={user.userName}
                                        onChange={(e) => {
                                            setUser({ ...user, userName: e.target.value });
                                            setError("");
                                        }}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={user.password}
                                            onChange={(e) => {
                                                setUser({ ...user, password: e.target.value });
                                                setError(""); // Clear error message on input change
                                            }}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-2"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? '👁‍🗨' : '👁'} {/* Eye icon for toggle */}
                                        </button>
                                    </div>
                                </div>

                                <button onClick={handleLogin} className="w-full px-4 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Login</button>
                            </div>
                            {error !== "" && (
                                <div className="bg-red-700 text-white my-4 w-auto py-2 px-5 rounded text-center text-lg">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                    <Footer />
                </div>
            ) : (
                <div className="min-h-screen bg-gray-100 p-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">Data of Registered Teams</h1>
                    <div className="max-w-4xl mx-auto">
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <div className="text-lg font-semibold bg-green-800 rounded text-white py-3 px-5">Loading Data...</div>
                            </div>
                        ) : (
                            <div>
                                {data.map((val: any, index: number) => (
                                    <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col my-5" >
                                        <div className="mb-5">
                                            <h2 className="text-xl md:text-2xl underline font-semibold text-center text-blue-700">{val.teamName}</h2>
                                        </div>
                                        <div className="flex justify-between flex-col md:flex-row  items-center">
                                            <div className="w-full flex flex-col items-center">
                                                <div className="mb-4">
                                                    <h2 className="text-xl font-semibold text-center text-gray-700">Team Leader: <span className="text-orange-600">{val.teamLeaderName}</span></h2>
                                                </div>
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-semibold text-gray-600">Team Members</h3>
                                                    <div className="mt-2 space-y-2">
                                                        {val.teamMembers.map((teamval: any, teamindex: number) => (
                                                            <div key={teamindex} className="text-md font-semibold text-gray-500 flex">
                                                                <div className="my-1">{teamindex + 1}. <span className="text-red-500">{teamval.name}</span> (<span className="text-emerald-500">{teamval.rollNo}</span>) </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-600">Contact Information</h3>
                                                    <div className="mt-2 text-sm text-gray-500">
                                                        <p className="text-md my-2 font-semibold text-gray-600">Contact No: <span className="text-blue-600">{val.contactNo}</span></p>
                                                        <p className="text-md mb-2 font-semibold text-gray-600">Email: <a href={`mailto:${val.email}`} className="cursor text-blue-600">{val.email}</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col items-center">

                                                <div className="mb-4">
                                                    <h3 className="text-xl font-semibold text-gray-600 mb-1">Project Information</h3>
                                                    <p className="text-md font-semibold text-gray-600 mb-2">Project Title: <span className="text-xl text-fuchsia-700">{val.projectTitle}</span></p>
                                                    <div className="mb-3">
                                                        <p className="text-md font-semibold text-gray-600 mb-2">Domains:</p>
                                                        {

                                                            val.domains.map((domainval: string, keyindex: number) => (
                                                                <div key={keyindex} className={`text-sm font-semibold ${colorClasses[keyindex % colorClasses.length]} my-1`}>
                                                                    * {domainval}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <Link href={val.uploadedfile} className="bg-blue-700 mt-3 font-semibold py-2 px-3 rounded text-white hover:bg-blue-300 hover:text-black">
                                                        Open Presentation
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
