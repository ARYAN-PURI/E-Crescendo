import connect from '@/dbConfig/connect';
import teamModel from '@/models/teamModels';
import transport from '@/app/helper/mailer';
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(req:NextRequest){
    try{
        const reqBody=await req.json();
        const res=await teamModel.updateOne({_id:reqBody._id},
            {
                teamName:reqBody.teamName,
                teamLeaderName:reqBody.teamLeaderName,
                temSize:reqBody.teamSize,
                teamMembers:reqBody.teamMembers,
                contactNo:reqBody.teamNumber,
                email:reqBody.email,
                projectTitle:reqBody.projectTitle,
                uploadedfile:reqBody.uploadedfile,
                encryptedString:"",
            }
        );
        return NextResponse.json({message:"Data Updated Success",sucess:true,res},{status:200});
    }
    catch(error:any){
        return NextResponse.json({message:"Error Occur in Updating The Data",error:error.message},{status:500});
    }
}