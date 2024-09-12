"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function UpdateRegistrationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const encryptedString = searchParams.get('encryptedString');
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState({
        _id: "",
        teamName: "",
        teamLeaderName: "",
        teamSize: 3,
        teamMembers: [{}],
        contactNo: "",
        email: "",
        projectTitle: "",
        uploadedfile: ""
    });
    const [teamMembers, setTeamMembers] = useState([{ name: "", rollNo: "" }]);

    async function verifyEncryptedString() {
        if (!id || !encryptedString) {
            setMessage("You are not Allowed to access this page");
            return;
        }
        try {
            const result = await axios.post('/api/verifyString', { id, encryptedString });
            if (result.data.success) {
                setData(result.data.res);
                setTeamMembers(result.data.res.teamMembers);
                setMessage("");
            } else {
                setMessage(result.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        verifyEncryptedString();
    }, [id, encryptedString]);

    function handleMemberChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const newSize = parseInt(e.target.value, 10);
        setData(prevData => ({ ...prevData, teamSize: newSize }));
        setTeamMembers(Array.from({ length: newSize }, () => ({ name: "", rollNo: "" })));
    }

    function handleMemberUpdate(index: number, e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setTeamMembers(prevMembers => {
            const updatedMembers = [...prevMembers];
            updatedMembers[index] = { ...updatedMembers[index], [name]: value };
            return updatedMembers;
        });
    }

    async function updateData(sendData: any) {
        try {
            setIsLoading(true);
            await axios.post("/api/updateData", sendData);
            router.push('/formSubmitted');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    function handleSubmit() {
        if (!data.teamName) {
            setError('Team Name Field Cannot Be empty');
        } else if (!data.teamLeaderName) {
            setError('Leader Name Field Cannot Be empty');
        } else if (!data.contactNo) {
            setError('Contact Number Field Cannot Be empty');
        } else if (data.contactNo.length !== 10) {
            setError('Enter Correct Mobile Number');
        } else if (!data.email) {
            setError('Email Field Cannot Be empty');
        } else if (!data.projectTitle) {
            setError('Project Title Field Cannot Be empty');
        } else if (!data.uploadedfile) {
            setError('Enter the Link of Uploaded Presentation File');
        } else {
            const invalidMember = teamMembers.some(member => !member.name || !member.rollNo);
            if (invalidMember) {
                setError('Complete all The Team Members Details Correctly');
            } else {
                setError("");
                updateData({ ...data, teamMembers });
            }
        }
    }

    return (
        <Suspense fallback={
            <div className="flex justify-center items-center">
                <div className="text-lg mt-[20%] font-semibold bg-green-800 rounded text-white py-3 px-5">Loading Data...</div>
            </div>
        }>
            {message ? (
                <div className={`text-sm mt-[20%] text-center font-medium p-2 rounded-lg ${message.includes("not") ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"}`}>
                    {message}
                </div>
            ) : (
                <div>
                    <div className="flex flex-col">
                        <h1 className="text-center text-3xl my-5">Please Update the Fields You Want</h1>
                        <div className="flex flex-col mx-[10%] md:mx-[20%] xl:mx-[30%]">
                            <div className="my-3">
                                <label htmlFor="teamName">Team Name: </label>
                                <input type="text" className="border-grey border rounded py-1 px-2" id="teamName" value={data.teamName} onChange={(e) => setData({ ...data, teamName: e.target.value })} />
                            </div>

                            <div className="my-3">
                                <label htmlFor="teamLeaderName">Team Leader Name: </label>
                                <input type="text" className="border-grey border rounded py-1 px-2" id="teamLeaderName" value={data.teamLeaderName} onChange={(e) => setData({ ...data, teamLeaderName: e.target.value })} />
                            </div>

                            <div className="my-3">
                                <label htmlFor="TeamSize">Select Team Size: </label>
                                <select id="TeamSize" value={data.teamSize} onChange={handleMemberChange} className="border-black border rounded py-2 px-3">
                                    <option value={3}>3 Members</option>
                                    <option value={4}>4 Members</option>
                                    <option value={5}>5 Members</option>
                                </select>
                            </div>

                            <div className="my-3">
                                <label htmlFor="contactNo">Enter Contact Number: </label>
                                <input type="number" id="contactNo" className="border-grey border rounded py-1 px-2" value={data.contactNo} onChange={(e) => setData({ ...data, contactNo: e.target.value })} />
                            </div>

                            <div className="my-3">
                                <label htmlFor="email">Enter Email: </label>
                                <input type="email" id="email" className="border-grey border rounded py-1 px-2" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                            </div>

                            <div className="my-3">
                                <div>Enter Details of Team Members</div>
                                {teamMembers.map((member, index) => (
                                    <div key={index}>
                                        <input type="text" className="border-grey border rounded py-1 px-2 my-2 mr-4" placeholder="Name" name="name" value={member.name} onChange={(e) => handleMemberUpdate(index, e)} />
                                        <input type="text" className="border-grey border rounded py-1 px-2 my-2" placeholder="Roll No" name="rollNo" value={member.rollNo} onChange={(e) => handleMemberUpdate(index, e)} />
                                    </div>
                                ))}
                            </div>

                            <div className="my-3">
                                <label htmlFor="projectTitle">Project Title: </label>
                                <input type="text" className="border-grey border rounded py-1 px-2" id="projectTitle" value={data.projectTitle} onChange={(e) => setData({ ...data, projectTitle: e.target.value })} />
                            </div>

                            <div className="my-3">
                                <Link href={'https://www.google.com'} className="text-blue-600">Download The Sample Presentation</Link>
                            </div>

                            <div className="my-3">
                                <label htmlFor="uploadedFile">Enter The Link Of Uploaded Presentation on Google Drive:</label><br />
                                <input type="text" id="uploadedFile" value={data.uploadedfile} className="border-grey border rounded py-1 px-2 w-[80%]" onChange={(e) => setData({ ...data, uploadedfile: e.target.value })} /><br />
                                <div className="text-red-500">*Please Provide The Access to open the File</div>
                            </div>

                            {!isLoading ? (
                                <div className="flex justify-center">
                                    <button className="my-5 py-2 px-4 bg-blue-800 rounded font-bold text-white hover:bg-blue-200 hover:text-black" onClick={handleSubmit}>Update Data</button>
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <div className="my-5 py-2 px-4 bg-blue-800 rounded font-bold text-white">Submitting Response...</div>
                                </div>
                            )}
                            {error && (
                                <div className="bg-red-700 text-white my-4 w-auto py-2 px-5 rounded text-center text-lg">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Suspense>
    );
}
