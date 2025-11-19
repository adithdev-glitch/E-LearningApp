import { createTransport } from "nodemailer";

import { User } from "../models/user.js";
import { Courses } from "../models/courses.js";


const sendMail = async(email, subject, data) => {
    const transport = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        
        auth:{
            user: process.env.Gmail,
            pass: process.env.Password,
        },
    });

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: red;
        }
        p {
            margin-bottom: 20px;
            color: #666;
        }
        .otp {
            font-size: 36px;
            color: #7b68ee; /* Purple text */
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello ${data.name} your (One-Time Password) for your account verification is.</p>
        <p class="otp">${data.otp}</p> 
        <p>Want to become a Instructor in our team ?</p>
        <p>Send Your CV to <b>adithadhivr46@gmail.com</b></p>
    </div>
</body>
</html>
`;

    await transport.sendMail({
        from: process.env.Gmail,
        to: email,
        subject,
        html
    });
};

export default sendMail;

export const sendForgotMail = async (subject, data) => {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.Gmail,
        pass: process.env.Password,
      },
    });
  
    const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f3f3f3;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        padding: 20px;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 600px;
      }
      h1 {
        color: #5a2d82;
      }
      p {
        color: #666666;
      }
      .button {
        display: inline-block;
        padding: 15px 25px;
        margin: 20px 0;
        background-color: #5a2d82;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-size: 16px;
      }
      .footer {
        margin-top: 20px;
        color: #999999;
        text-align: center;
      }
      .footer a {
        color: #5a2d82;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Reset Your Password</h1>
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click the button below to reset your password.</p>
      <a href="${process.env.frontendurl}/reset-password/${data.token}" class="button">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <div class="footer">
        <p>Thank you,<br>Eonix Team</p>
      </div>
    </div>
  </body>
  </html>
  `;
  
    await transport.sendMail({
      from: process.env.Gmail,
      to: data.email,
      subject,
      html,
    });
  };



export const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Fetch the user and course details
    const user = await User.findById(req.user._id);
    const course = await Courses.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or Course not found" });
    }

    // Nodemailer setup
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.Gmail,
        pass: process.env.Password,
      },
    });

    // Generate certificate HTML
    const html = `
      <div style="
    width: 80%;
    margin: 2rem auto;
    padding: 3rem;
    border: 10px double #4f46e5;
    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.08);
    text-align: center;
  ">
    <h1 style="font-size: 2.5rem; color: #4f46e5; margin-bottom: 0.5rem;">Certificate of Completion</h1>
    <h2 style="font-size: 1.4rem; font-weight: normal; margin-bottom: 2rem; color: #555;">This is to certify that</h2>

    <div style="font-size: 2rem; font-weight: bold; color: #111; margin: 1rem 0;">${user.name}</div>

    <p style="font-size: 1.2rem; color: #333; margin: 1rem 0;">has successfully completed the course</p>
    <p style="font-size: 1.2rem; color: #333; margin: 1rem 0; font-style: italic;">"${course.title}"</p>
    <p style="font-size: 1.2rem; color: #333; margin: 1rem 0;">on ${new Date().toLocaleDateString()}</p>

  </div>
    `;

    // Send the email
    await transport.sendMail({
      from: process.env.Gmail,
      to: user.email,
      subject: "Course Completion Certificate",
      html,
    });

    res.status(200).json({ message: "Certificate sent to your email!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate certificate" });
  }
};
