"use client";
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
    domains: [""],
    projectTitle: "",
    uploadedfile: "",
  });


  const [mobile, setMobile] = useState('');
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
    } else if (data.domains.length == 0 || data.domains[0] === "") {
      setError("Select Atleast One Domain to which your Project Belongs");
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
      <NavBar />
      <div className="flex flex-col items-center py-20 bg-gradient-to-br  from-gray-700 via-gray-900 to-black min-h-screen">
        <h1 className="text-4xl font-semibold text-white my-8 text-center">
          Team Registration Form
        </h1>
        <div className="flex flex-col items-center py-20 bg-gradient-to-br  from-gray-700 via-gray-800 to-black  max-w-4xl rounded-md  w-full">
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
                  <option value={4} className="text-slate-700">4 Members</option>
                  <option value={5} className="text-slate-700" >5 Members</option>
                </select>
              </div>

              <div>
                <label htmlFor="contactNo" className="block text-blue-700 font-medium">
                  Contact Number
                </label>
                <PhoneInput
                  country={'in'} // Default country
                  value={mobile}
                  onChange={(phone: string) => {
                    if (phone.length == 12) {
                      data.contactNo = phone.substring(2);

                    }
                    else {
                      data.contactNo = mobile;
                      setMobile(phone);
                    }
                  }}
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
                <label htmlFor="domain" className="block text-blue-700 font-medium mb-4">
                  Project Domains
                </label>
                <div className="grid md:grid-cols-2 gap-4 px-2 py-2">
                  {[
                    "IOT and Hardware",
                    "Wireless Communication",
                    "AI/ML",
                    "Signal Processing and Networking",
                    "Web Development",
                    "Data Science",
                    "Cloud Computing",
                    "Health and Hospitality",
                    "Modeling/Simulation",
                    "VLSI Design",
                    "Embedded Systems",
                    "Power and Control Systems",
                    "Robotics and Automation",
                    "Machine Design",
                    "Quantum Mechanics",
                    "Optics and Photonics",
                    "Nanotechnology and Biomaterials",
                    "Polymer and Biochemical Technology",
                    "Building Information Modeling [BIM]",
                    "Structural Engineering",
                    "Geometrical Engineering",
                    "Transportation Engineering",
                    "Augmented and Virtual Reality",
                    "Other"
                  ].map((domain) => (
                    <div key={domain} className="flex items-center group h-6">
                      <input
                        type="checkbox"
                        id={domain}
                        value={domain}
                        checked={data.domains.includes(domain)}
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          let newDomains = checked
                            ? [...data.domains, value]
                            : data.domains.filter((d) => d !== value);
                          newDomains = newDomains.filter((val) => val !== "");
                          setdata({ ...data, domains: newDomains });
                        }}
                        className="hidden peer"
                      />
                      <div className="w-5 h-5 border-2 border-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out peer-checked:bg-blue-500 peer-checked:border-transparent">
                        <svg
                          className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <label
                        htmlFor={domain}
                        className="ml-3 text-md text-gray-700 font-medium cursor-pointer group-hover:text-blue-500 transition-colors duration-300"
                      >
                        {domain}
                      </label>
                    </div>
                  ))}
                </div>
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
                <a
                  href='./guidelines/pptTemplate.png'
                  download="E-Crescendo ecell-nith 2024 PPT Template"
                  className="text-blue-600 hover:underline"
                >
                  Download The Sample Presentation
                </a>
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
      <Footer />
    </div>
  );
}
