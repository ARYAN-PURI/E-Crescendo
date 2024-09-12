import connect from '@/dbConfig/connect';
import teamModel from '@/models/teamModels';
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(req:NextRequest){
    try{
        let reqBody=await req.json();
        let res=await teamModel.findOne({_id:reqBody.id});
        if(res.encryptedString==reqBody.encryptedString){
            if(res.encryptedStringExpiry>new Date(Date.now())){
                return NextResponse.json({message:"Encrypted String Verified",success:true,res},{status:200});
            }
            return NextResponse.json({message:"The Link Time has Been Expired",success:false},{status:200});
        }
        return NextResponse.json({message:"You are not allowed to access this page",success:false},{status:200});
    }
    catch(error:any){
        return NextResponse.json({message:"Error Occur Verifying the Encrypted String",error:error.message},{status:500});
    }
}