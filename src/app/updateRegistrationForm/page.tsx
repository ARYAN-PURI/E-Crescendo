'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
export default function UpdateRegistrationForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setdata] = useState({
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
    async function VerifyEncryptedString() {
        const searchParams=useSearchParams();
        const id=searchParams.get('id');
        const encryptedString =searchParams.get('encryptedString');
        if (id == "" || encryptedString == "") {
            setLoading(false);
            setMessage("You are not Allowed to access this page");
        }
        else {
            try {
                const result = await axios.post('/api/verifyString', { id: id, encryptedString: encryptedString });
                if (result.data.success) {
                    setdata(result.data.res);
                    setTeamMembers(result.data.res.teamMembers);
                    setMessage("");
                }
                else {
                    setMessage(result.data.message);
                }
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
    }
    useEffect(() => {
        verifyEncryptedString();
    }, []);

    function handleMemberChange(e: any) {
        setdata({ ...data, teamSize: parseInt(e.target.value) });
        const updatedTeamMembers = [];
        for (let i = 0; i < e.target.value; i++) {
            updatedTeamMembers.push({ name: "", rollNo: "" });
        }
        setTeamMembers(updatedTeamMembers);
    }
    function handleMemberUpdate(index: number, e: any) {
        const updatedmembers = [...teamMembers];
        // @ts-expect-error: Ignoring type error because the function is intentionally invoked with incorrect types
        updatedmembers[index][e.target.name] = e.target.value;
        setTeamMembers(updatedmembers);
    }
    async function updateData(sendData: any) {
        try {
            setIsLoading(true);
            await axios.post("/api/updateData", sendData);
            router.push('/formSubmitted');
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    function handleSubmit() {
        setdata({ ...data });
        if (data.teamName == "") {
            setError('Team Name Field Cannot Be empty');
        }
        else if (data.teamLeaderName == "") {
            setError('Leader Name Field Cannot Be empty');
        }
        else if (data.contactNo == "") {
            setError('Contact Number Field Cannot Be empty');
        }
        else if (data.contactNo.length < 10 || data.contactNo.length > 10) {
            setError('Enter Correct Mobile Number')
        }
        else if (data.email == "") {
            setError('Email Field Cannot Be empty');
        }
        else if (data.projectTitle == "") {
            setError('Project Title Field Cannot Be empty');
        }
        else if (data.uploadedfile == "") {
            setError('Enter the Link of Uploaded Presentation File');
        }
        else {
            let i = 0
            for (; i < data.teamSize; i++) {
                if (teamMembers[i].name == "" || teamMembers[i].rollNo == "") {
                    setError('Complete all The Team Members Details Correctly');
                    break;
                }
            }
            if (i == data.teamSize) {
                setError("");
                updateData({ ...data, teamMembers: teamMembers });
            }
        }
    }

    return (
        <div>
            {
                loading ?
                    <div className="flex justify-center items-center">
                        <div className="text-lg mt-[20%] font-semibold bg-green-800 rounded text-white py-3 px-5">Loading Data...</div>
                    </div>
                    :
                    
                    message!=="" ?
                        <div className={`text-sm mt-[20%] text-center font-medium p-2 rounded-lg ${message.includes("not") ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"}`}>
                            {message}
                        </div>
                        :
                        <div>
                            <div className="flex flex-col">
                                <h1 className="text-center text-3xl my-5">Please Update the Fields You Want</h1>
                                <div className="flex flex-col mx-[10%] md:mx-[20%] xl:mx-[30%]">
                                    <div className="my-3">
                                        <label htmlFor="teamName">Team Name: </label>
                                        <input type="text" className="border-grey border rounded py-1 px-2" id="teamName" value={data.teamName} onChange={(e) => { setdata({ ...data, teamName: e.target.value }) }} />
                                    </div>

                                    <div className="my-3">
                                        <label htmlFor="teamLeaderName">Team Leader Name: </label>
                                        <input type="text" className="border-grey border rounded py-1 px-2" id="teamLeaderName" value={data.teamLeaderName} onChange={(e) => { setdata({ ...data, teamLeaderName: e.target.value }) }} />
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
                                        <input type="number" id="contactNo" className="border-grey border rounded py-1 px-2" value={data.contactNo} onChange={(e) => { setdata({ ...data, contactNo: e.target.value }) }} />
                                    </div>

                                    <div className="my-3">
                                        <label htmlFor="email">Enter Email: </label>
                                        <input type="email" id="email" className="border-grey border rounded py-1 px-2" value={data.email} onChange={(e) => { setdata({ ...data, email: e.target.value }) }} />
                                    </div>

                                    <div className="my-3">
                                        <div>Enter Details of Team Members</div>
                                        {
                                            teamMembers.map((data, index) => (
                                                <div key={index}>
                                                    <input type="text" className="border-grey border rounded py-1 px-2 my-2 mr-4" placeholder="Name" name="name" value={teamMembers[index].name} onChange={(e) => { handleMemberUpdate(index, e) }} />
                                                    <input type="text" className="border-grey border rounded py-1 px-2 my-2 " placeholder="Roll No" name="rollNo" value={teamMembers[index].rollNo} onChange={(e) => { handleMemberUpdate(index, e) }} />
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className="my-3">
                                        <label htmlFor="projectTitle">Project Title: </label>
                                        <input type="text" className="border-grey border rounded py-1 px-2" id="projectTitle" value={data.projectTitle} onChange={(e) => { setdata({ ...data, projectTitle: e.target.value }) }} />
                                    </div>

                                    <div className="my-3">
                                        <Link href={'https://www.google.com'} className="text-blue-600">Download The Sample Presentation</Link>
                                    </div>

                                    <div className="my-3">
                                        <label htmlFor="uploadedFile">Enter The Link Of Uploaded Presentaion on Google Drive:</label><br />
                                        <input type="text" id="uploadedFile" value={data.uploadedfile} className="border-grey border rounded py-1 px-2 w-[80%]" onChange={(e) => { setdata({ ...data, uploadedfile: e.target.value }) }} /><br />
                                        <div className="text-red-500">*Please Provide The Access to open the File</div>
                                    </div>

                                    {!isLoading ?
                                        <div className="flex justify-center">
                                            <button className=" my-5 py-2 px-4 bg-blue-800 rounded font-bold text-white hover:bg-blue-200 hover:text-black" onClick={handleSubmit}>Update Data</button>
                                        </div>
                                        :
                                        <div className="flex justify-center">
                                            <div className=" my-5 py-2 px-4 bg-blue-800 rounded font-bold text-white hover:bg-blue-200 hover:text-black" >Submitting Response...</div>
                                        </div>
                                    }
                                    {error !== "" ?
                                        <div className="bg-red-700 text-white my-4 w-auto py-2 px-5 rounded text-center text-lg">
                                            {error}
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                    }
        </div>
    );
}