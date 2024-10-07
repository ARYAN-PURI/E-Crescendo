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
    const [user, setUser] = useState({
        userName: "",
        password: "",
    });
    const [error, setError] = useState("");
    function handleLogin() {
        if (user.userName == process.env.NEXT_PUBLIC_USER_NAME && user.password == process.env.NEXT_PUBLIC_PASSWORD) {
            setIsCorrect(true);
            setError("");
        }
        else {
            setError('Invalid Admin Credentials');
        }
    }
    async function getdata() {
        try {
            const result = await axios.get(`/api/getData?nocache=${Date.now()}`, {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate,proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            console.log(result);
            setData(result.data.res);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getdata();
    }, []);
    return (
        <div>
            {
                !isCorrect ?
                    <div className="flex items-center flex-col justify-between bg-gradient-to-br  from-gray-700 via-gray-900 to-black min-h-screen">
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
                                            onChange={(e) => setUser({ ...user, userName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={user.password}
                                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <button onClick={handleLogin} className="w-full px-4 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Login</button>
                                </div>
                                {error !== "" ?
                                    <div className="bg-red-700 text-white my-4 w-auto py-2 px-5 rounded text-center text-lg">
                                        {error}
                                    </div>
                                    : null}
                            </div>
                        </div>
                        <Footer />
                    </div>
                    :
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
                                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 md:px-10 flex flex-col md:flex-row justify-between my-5">
                                            <div className="md:w-[50%] w-full mb-6 md:mb-0">
                                                <div className="mb-4">
                                                    <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-700">{val.teamName}</h2>
                                                </div>
                                                <div className="mb-4">
                                                    <h2 className="text-md md:text-lg font-semibold text-center text-gray-700">Team Leader: {val.teamLeaderName}</h2>
                                                </div>
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-semibold text-gray-600 ml-[15%]">Team Members</h3>
                                                    <div className="mt-2 space-y-2">
                                                        {val.teamMembers.map((teamval: any, teamindex: number) => (
                                                            <div key={teamindex} className="text-md font-semibold text-gray-500 flex">
                                                                <div className="my-1 ml-[10%]">{teamindex + 1}. {teamval.name} ({teamval.rollNo}) </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-[50%] w-full mt-0 md:mt-[5%]">
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-semibold text-gray-600">Contact Information</h3>
                                                    <div className="mt-2 text-sm text-gray-500">
                                                        <p className="text-md font-semibold text-green-500">Contact No: {val.contactNo}</p>
                                                        <p className="text-md font-semibold text-violet-500">Email: <a href={`mailto:${val.email}`} className="cursor">{val.email}</a></p>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-semibold text-gray-600">Project Information</h3>
                                                    <p className="text-sm font-semibold text-gray-500 mb-2">Project Title: <span className="text-xl">{val.projectTitle}</span></p>
                                                    <Link href={val.uploadedfile} className="bg-blue-700 mt-3 font-semibold py-2 px-3 rounded text-white hover:bg-blue-300 hover:text-black">
                                                        Open Presentation
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
            }


        </div>
    );
}
