import connect from '@/dbConfig/connect';
import teamModel from '@/models/teamModels';
import transport from '@/app/helper/mailer';
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(req:NextRequest){
    try{
        const reqBody=await req.json();
        const res=await teamModel.findOne({email:reqBody.email});
        if(!res){
            return NextResponse.json({message:"Team Email Does Not Exist",success:false},{status:200});
        }
        let encryptedString = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 15; i++) {
            const randomInd = Math.floor(Math.random() * characters.length);
            encryptedString += characters.charAt(randomInd);
        }
        await teamModel.updateOne({_id:res._id},{
            encryptedString:encryptedString,
            encryptedStringExpiry:new Date(Date.now()+10*60*1000)
        });
        const fieldUrl=`http://localhost:3000/updateRegistrationForm?encryptedString=${encryptedString}&id=${res._id}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: reqBody.email,
            subject: 'Action Required: Update Your Registered Team Data for E-Crescendo',
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #ff5722; text-align: center;">Update Your Team Data</h2>
                <p>Dear Participant,</p>
                <p>This is an auto-generated email to notify you that your team data for <b>E-Crescendo</b> needs to be updated.</p>
                
                <p>Please use the link below to update your registration details:</p>
                
                <p style="text-align: center;">
                  <a href="${fieldUrl}" style="background-color: #ff5722; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Update Your Team Data
                  </a>
                </p>
                
                <p style="color: #f44336; text-align: center;">
                  <b>Note:</b> This link is active for only 10 minutes. Please make sure to update within the given time.
                </p>
                
                <p>If you have any questions or encounter any issues, please feel free to contact our support team.</p>
                
                <p style="margin-top: 30px;">Best Regards,</p>
                <p><b>The E-Crescendo Team</b></p>
                
                <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0;">
                
                <p style="font-size: 0.9em; color: #888; text-align: center;">
                  This is an auto-generated email. Please do not reply directly to this message.
                </p>
              </div>`
          };
          
        let mailresponse;
        try{
            mailresponse=await transport.sendMail(mailOptions);
        }
        catch(error){
            console.log(error);
        }
        return NextResponse.json({message:'Mail Sent Success',success:true,mailresponse},{status:200})
    }
    catch(error:any){
        return NextResponse.json({message:"Error Occur in Sending the Email to Registered Team",error:error.message},{status:500});
    }
}