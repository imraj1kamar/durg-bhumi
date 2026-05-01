// import nodemailer from "nodemailer";

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     const transporter = nodemailer.createTransporter({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: "booking@durgbhumi.com",
//       subject: "New Enquiry from DurgBhumi Website",
//       html: `
//         <h2>New Booking Enquiry</h2>
//         <p><strong>Name:</strong> ${body.name}</p>
//         <p><strong>Email:</strong> ${body.email}</p>
//         <p><strong>Phone:</strong> ${body.phone}</p>
//         <p><strong>Subject:</strong> ${body.subject}</p>
//         <p><strong>Message:</strong></p>
//         <p>${body.message.replace(/\n/g, '<br>')}</p>
//       `,
//     });

//     return Response.json({ success: true });
//   } catch (error) {
//     console.error('Email error:', error);
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }


import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "booking@durgbhumi.com",
      subject: "New Enquiry",
      html: `
        <h2>New Enquiry</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to send email",
    });
  }
}