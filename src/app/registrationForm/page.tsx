"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function RegistrationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState({
    teamName: "",
    teamLeaderName: "",
    teamSize: 3,
    teamMembers: [{}],
    contactNo: "",
    email: "",
    projectTitle: "",
    uploadedfile: "",
  });
  const [teamMembers, setTeamMembers] = useState([
    { name: "", rollNo: "" },
    { name: "", rollNo: "" },
    { name: "", rollNo: "" },
  ]);
  const [error, setError] = useState("");

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

  async function submitData(sendData: any) {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/submitData", sendData);
      if (!res.data.success) {
        setError("Email Already Exists. Try With A Different Account");
      } else {
        router.push("/formSubmitted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit() {
    setdata({ ...data });
    if (data.teamName == "") {
      setError("Team Name Field Cannot Be Empty");
    } else if (data.teamLeaderName == "") {
      setError("Leader Name Field Cannot Be Empty");
    } else if (data.contactNo == "") {
      setError("Contact Number Field Cannot Be Empty");
    } else if (data.contactNo.length < 10 || data.contactNo.length > 10) {
      setError("Enter Correct Mobile Number");
    } else if (data.email == "") {
      setError("Email Field Cannot Be Empty");
    } else if (data.projectTitle == "") {
      setError("Project Title Field Cannot Be Empty");
    } else if (data.uploadedfile == "") {
      setError("Enter the Link of Uploaded Presentation File");
    } else {
      let i = 0;
      for (; i < data.teamSize; i++) {
        if (teamMembers[i].name == "" || teamMembers[i].rollNo == "") {
          setError("Complete all The Team Members Details Correctly");
          break;
        }
      }
      if (i == data.teamSize) {
        setError("");
        submitData({ ...data, teamMembers: teamMembers });
      }
    }
  }

  return (
    <div>
      <NavBar/>
    <div className="flex flex-col items-center py-20 bg-gradient-to-br  from-gray-700 via-gray-900 to-black min-h-screen">
      <h1 className="text-4xl font-semibold text-white my-8 text-center">
        Team Registration Form
      </h1>
      <div className="flex flex-col items-center py-20 bg-gradient-to-br  from-gray-700 via-gray-800 to-black  max-w-3xl rounded-md ">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-8 lg:p-12">
        <div className="space-y-6">
          <div>
            <label htmlFor="teamName" className="block text-blue-800 font-medium ">
              Team Name
            </label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              id="teamName"
              value={data.teamName}
              onChange={(e) => {
                setdata({ ...data, teamName: e.target.value });
              }}
            />
          </div>

          <div>
            <label htmlFor="teamLeaderName" className="block text-blue-700 font-medium">
              Team Leader Name
            </label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              id="teamLeaderName"
              value={data.teamLeaderName}
              onChange={(e) => {
                setdata({ ...data, teamLeaderName: e.target.value });
              }}
            />
          </div>

          <div>
            <label htmlFor="TeamSize" className="block text-blue-700 font-medium">
              Team Size
            </label>
            <select
              id="TeamSize"
              value={data.teamSize}
              onChange={handleMemberChange}
              className="mt-1 w-full border font-medium border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value={3} className="text-slate-700">3 Members</option>
              <option value={4}  className="text-slate-700">4 Members</option>
              <option value={5} className="text-slate-700" >5 Members</option>
            </select>
          </div>

          <div>
  <label htmlFor="contactNo" className="block text-blue-700 font-medium">
    Contact Number
  </label>
  <PhoneInput
    country={'in'} // Default country
    value={data.contactNo}
    onChange={(phone) => setdata({ ...data, contactNo: phone })}
    inputProps={{
      name: 'contactNo',
      required: true,
      autoFocus: false,
    }}
    containerClass="mt-1 w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none" 
    inputStyle={{
      paddingLeft: '3rem', // distance between flag and code
      width: '100%',
      paddingTop: '1.3rem',
      paddingBottom: '1.3rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
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



          <div>
            <label htmlFor="email" className="block text-blue-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={data.email}
              onChange={(e) => {
                setdata({ ...data, email: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="block text-blue-700 font-medium">Team Members</label>
            {teamMembers.map((data, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-around mt-2 mx-auto gap-2">
                <input
                  type="text"
                  className="flex-grow border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Name"
                  name="name"
                  value={teamMembers[index].name}
                  onChange={(e) => {
                    handleMemberUpdate(index, e);
                  }}
                />
                <input
                  type="text"
                  className="flex-grow border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Roll No"
                  name="rollNo"
                  value={teamMembers[index].rollNo}
                  onChange={(e) => {
                    handleMemberUpdate(index, e);
                  }}
                />
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="projectTitle" className="block text-blue-700 font-medium">
              Project Title
            </label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              id="projectTitle"
              value={data.projectTitle}
              onChange={(e) => {
                setdata({ ...data, projectTitle: e.target.value });
              }}
            />
          </div>

          <div>
            <Link
              href={
                "https://drive.google.com/drive/folders/1ScRvEIfU_QdZ1fFXGe4MLsqVfaa-zCpv?usp=drive_link"
              }
              className="text-blue-600 hover:underline"
            >
              Download The Sample Presentation
            </Link>
          </div>

          <div>
            <label htmlFor="uploadedFile" className="block text-blue-700 font-medium">
              Presentation File Link (Google Drive)
            </label>
            <input
              type="text"
              id="uploadedFile"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => {
                setdata({ ...data, uploadedfile: e.target.value });
              }}
            />
            <p className="text-sm text-red-500 mt-2">
              * Please provide access to open the file.
            </p>
            <p className="text-sm text-red-500">* Follow the sample presentation format.</p>
          </div>
          </div>

          {!isLoading ? (
            <div className="flex justify-center">
              <button
                className="my-5 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="my-5 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow">
                Submitting Response...
              </div>
            </div>
          )}

          {error !== "" && (
            <div className="bg-red-600 text-white my-4 py-3 px-5 rounded-lg text-center">
              {error}
            </div>
          )}
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
}
