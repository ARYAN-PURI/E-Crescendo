"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function RegistrationForm(){
    const router=useRouter();
    const [isLoading,setIsLoading]=useState(false);
    const [data,setdata]=useState({
        teamName:"",
        teamLeaderName:"",
        teamSize:3,
        teamMembers:[{}],
        contactNo:"",
        email:"",
        projectTitle:"",
        uploadedfile:""
    });
    const [teamMembers,setTeamMembers]=useState([
        {name:"", rollNo:""},
        {name:"", rollNo:""},
        {name:"", rollNo:""},
    ]);
    const [error,setError]=useState("");
    function handleMemberChange(e:any){
        setdata({...data,teamSize:parseInt(e.target.value)});
        const updatedTeamMembers=[];
        for(let i=0;i<e.target.value;i++){
            updatedTeamMembers.push({name:"",rollNo:""});
        }
        setTeamMembers(updatedTeamMembers);
    }
    function handleMemberUpdate(index:number,e:any){
        const updatedmembers=[...teamMembers];
        // New
        // @ts-expect-error: Ignoring type error because the function is intentionally invoked with incorrect types
        updatedmembers[index][e.target.name]=e.target.value;
        setTeamMembers(updatedmembers);
    }
    async function submitData(sendData:any){
        try{
            setIsLoading(true);
            const res=await axios.post("/api/submitData",sendData);
            if(!res.data.success){
                setError("Email Already Exits Try With Diffrent Account");
            }
            else{
                router.push('/formSubmitted');
            }
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }
    function handleSubmit(){
        setdata({...data});
        if(data.teamName==""){
            setError('Team Name Field Cannot Be empty');
        }
        else if(data.teamLeaderName==""){
            setError('Leader Name Field Cannot Be empty');
        }
        else if(data.contactNo==""){
            setError('Contact Number Field Cannot Be empty');
        }
        else if(data.contactNo.length<10 || data.contactNo.length>10){
            setError('Enter Correct Mobile Number')
        }
        else if(data.email==""){
            setError('Email Field Cannot Be empty');
        }
        else if(data.projectTitle==""){
            setError('Project Title Field Cannot Be empty');
        }
        else if(data.uploadedfile==""){
            setError('Enter the Link of Uploaded Presentation File');
        }
        else{
            let i=0
            for(;i<data.teamSize;i++){
                if(teamMembers[i].name=="" || teamMembers[i].rollNo==""){
                    setError('Complete all The Team Members Details Correctly');
                    break;
                }
            }
            if(i==data.teamSize){
                setError("");
                submitData({...data,teamMembers:teamMembers});
            }
        }
    }
    return (
        <div className="flex flex-col">
            <h1 className="text-center text-3xl my-5">Please Fill the Form to register a Team</h1>
            <div className="flex flex-col mx-[10%] md:mx-[20%] xl:mx-[30%]">
                <div className="my-3">
                    <label htmlFor="teamName">Team Name: </label>
                    <input type="text" className="border-grey border rounded py-1 px-2" id="teamName" value={data.teamName} onChange={(e)=>{setdata({...data,teamName:e.target.value})}} />
                </div>

                <div className="my-3">
                    <label htmlFor="teamLeaderName">Team Leader Name: </label>
                    <input type="text" className="border-grey border rounded py-1 px-2" id="teamLeaderName" value={data.teamLeaderName} onChange={(e)=>{setdata({...data,teamLeaderName:e.target.value})}} />
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
                    <input type="number" id="contactNo" className="border-grey border rounded py-1 px-2" value={data.contactNo} onChange={(e)=>{setdata({...data,contactNo:e.target.value})}}/>
                </div>

                <div className="my-3">
                    <label htmlFor="email">Enter Email: </label>
                    <input type="email" id="email" className="border-grey border rounded py-1 px-2" value={data.email} onChange={(e)=>{setdata({...data,email:e.target.value})}}/>
                </div>

                <div className="my-3">
                    <div>Enter Details of Team Members</div>
                    {
                        teamMembers.map((data,index)=>(
                            <div key={index}>
                                <input type="text" className="border-grey border rounded py-1 px-2 my-2 mr-4" placeholder="Name" name="name" value={teamMembers[index].name} onChange={(e)=>{handleMemberUpdate(index,e)}} />
                                <input type="text" className="border-grey border rounded py-1 px-2 my-2 " placeholder="Roll No" name="rollNo" value={teamMembers[index].rollNo} onChange={(e)=>{handleMemberUpdate(index,e)}} />
                            </div>
                        ))
                    }
                </div>
                
                <div className="my-3">
                    <label htmlFor="projectTitle">Project Title: </label>
                    <input type="text" className="border-grey border rounded py-1 px-2" id="projectTitle" value={data.projectTitle} onChange={(e)=>{setdata({...data,projectTitle:e.target.value})}} />
                </div>

                <div className="my-3">
                    <Link href={'https://www.google.com'} className="text-blue-600">Download The Sample Presentation</Link>
                </div>
                
                <div className="my-3">
                    <label htmlFor="uploadedFile">Enter The Link Of Uploaded Presentaion on Google Drive:</label><br/>
                    <input type="text"  id="uploadedFile" className="border-grey border rounded py-1 px-2 w-[80%]" onChange={(e)=>{setdata({...data,uploadedfile:e.target.value})}} /><br/>
                    <div className="text-red-500">*Please Provide The Access to open the File</div>
                </div>
                
                {!isLoading?
                    <div className="flex justify-center">
                    <button  className=" my-5 py-2 px-4 bg-blue-800 rounded font-bold text-white hover:bg-blue-200 hover:text-black" onClick={handleSubmit}>Submit</button>
                    </div>
                :
                    <div className="flex justify-center">
                    <div  className=" my-5 py-2 px-4 bg-blue-800 rounded font-bold text-white hover:bg-blue-200 hover:text-black" >Submitting Response...</div>
                    </div>
                }
                {error!==""?
                <div className="bg-red-700 text-white my-4 w-auto py-2 px-5 rounded text-center text-lg">
                    {error}
                </div>
                :null}
            </div>
        </div>
    );
}