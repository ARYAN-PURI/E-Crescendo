import transport from '@/app/helper/mailer';
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest){
    try{
        const reqBody=await req.json();
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'New Query Submitted',
            html: `
              <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h2 style="color: #4CAF50;">New Query Received</h2>
                
                <p>Hello Admin,</p>
                <p>You have received a new query from a user. The details are as follows:</p>
          
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${reqBody.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Mobile No:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${reqBody.mobile}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${reqBody.email}</td>
                  </tr>
                </table>
          
                <h3 style="color: #4CAF50;">Query Details</h3>
                <p style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9;">${reqBody.query}</p>
          
                <p>Kindly respond to this query as soon as possible.</p>
          
                <p>Best regards,<br/> Powered By Team E-Cell</p>
              </div>
            `
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