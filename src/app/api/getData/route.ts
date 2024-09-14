import connect from '@/dbConfig/connect';
import teamModel from '@/models/teamModels';
import {NextResponse } from "next/server";
connect();
export async function GET(){
    try{
        const res=await teamModel.find();
        const response=NextResponse.json({message:"Teams Data Reterived",success:true,res},{status:200});
        response.headers.set('Cache-Control', 'no-store, max-age=0');
        return response;
    }
    catch(error:any){
        return NextResponse.json({message:"Error Occur in Reteriving the data",error:error.message},{status:500});
    }
}