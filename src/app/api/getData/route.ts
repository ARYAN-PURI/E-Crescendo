import connect from '@/dbConfig/connect';
import teamModel from '@/models/teamModels';
import {NextResponse } from "next/server";
connect();
export async function GET(){
    try{
        const res=await teamModel.find();
        const response=NextResponse.json({message:"Teams Data Reterived",success:true,res, timestamp: new Date().toISOString() },{status:200});
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        return response;
    }
    catch(error:any){
        return NextResponse.json({message:"Error Occur in Reteriving the data",error:error.message},{status:500});
    }
}