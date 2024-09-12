import nodemailer from "nodemailer";
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS_KEY
    }
  });
export default transport;
