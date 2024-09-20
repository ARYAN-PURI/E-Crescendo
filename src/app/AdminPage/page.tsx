"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
export default function AdminPage() {
    const [data, setData] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    async function getdata() {
        try {
            const result = await axios.get(`/api/getDatanocache=${Date.now()}`,{
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
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">Data of Registered Teams</h1>
            <div className="max-w-4xl mx-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="text-lg font-semibold bg-green-800 rounded text-white py-3 px-5">Loading Data...</div>
                    </div>
                ) : (
                    <div>
                        {data.map((val :any, index:number) => (
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
    );
}
