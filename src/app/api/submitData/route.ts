import connect from '@/dbConfig/connect';
import teamModel from '@/models/teamModels';
import { NextRequest, NextResponse } from "next/server";
import transport from '@/app/helper/mailer';
connect();
export async function POST(req:NextRequest){
    try{
        const reqBody=await req.json();
        const teamData=new teamModel({...reqBody});
        const result=await teamModel.find({email:reqBody.email});
        if(!result){
            const res=await teamData.save();
            const fieldUrl='https://e-crescendo.vercel.app/EditResponseForm';
            const mailOptions = {
                from: process.env.EMAIL,
                to: reqBody.email,
                subject: 'Thank You for Registering for the E-Crescendo Event',
                html: `
                  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #4CAF50; text-align: center;">Thank You for Registering!</h2>
                    <p>Dear Participant,</p>
                    <p>We are excited to confirm your registration for the <b>E-Crescendo Event</b>. Your form has been successfully submitted.</p>
                    
                    <p>If you need to update any of your details, please use the link below:</p>
                    
                    <p style="text-align: center;">
                      <a href="${fieldUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Update Your Response
                      </a>
                    </p>
                    
                    <p>We look forward to your participation in the event. Should you have any questions or require further assistance, feel free to reach out to us.</p>
                    
                    <p style="margin-top: 30px;">Best Regards,</p>
                    <p><b>The E-Crescendo Team</b></p>
                    
                    <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
                    
                    <p style="font-size: 0.9em; color: #888; text-align: center;">
                      This is an auto-generated email. Please do not reply directly to this message.
                    </p>
                  </div>`
              };
              
            try{
              await transport.sendMail(mailOptions);
            }
            catch(error){
                console.log(error);
            }
            return NextResponse.json({message:"Team Registered SuccessFully",success:true,res},{status:200});
        }
        else{
            return NextResponse.json({message:"Email Already Exits",success:false},{status:200});
        }

    }
    catch(error:any){
        return NextResponse.json({message:"Error Occur in Submitting the data",error:error.message},{status:500});
    }
}