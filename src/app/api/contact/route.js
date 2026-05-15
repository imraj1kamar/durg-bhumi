export const runtime = "nodejs";

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Capture requester IP (works behind most proxies)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : (req.headers.get("x-real-ip") || "Unknown IP");

    // Optional geo hints (e.g., provided by Vercel / some proxies)
    const country = req.headers.get("x-vercel-ip-country") || "";
    const city = req.headers.get("x-vercel-ip-city") || "";
    const region = req.headers.get("x-vercel-ip-country-region") || "";

    const location = `${city}, ${region}, ${country}`.trim().replace(/^,\s+|,\s+$/g, "");

    const userAgent = req.headers.get("user-agent") || "Unknown Device";

    // Destructure body
    const { name, email, phone, subject, message } = body;


    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: "All fields required",
      });
    }

    // Transporter
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({
        success: false,
        message: "Missing SMTP credentials. Please set SMTP_USER and SMTP_PASS in Vercel Environment Variables.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });


    // Verify SMTP
    await transporter.verify();

    console.log("SMTP Connected");

    // Send Email
    await transporter.sendMail({
  from: `"DurgBhumi Website" <${process.env.SMTP_USER}>`,
  to: "booking@durgbhumi.com",
  replyTo: email,
  subject: `New Enquiry - ${subject || "Website Enquiry"}`,

  html: `
    <div style="
      font-family: Arial;
      padding:20px;
      background:#f5f5f5;
    ">

      <div style="
        max-width:100%;
        margin:auto;
        background:white;
        border-radius:12px;
        overflow:hidden;
        border:1px solid #e5e5e5;
      ">

        <div style="
          background:#000;
          color:white;
          padding:20px;
          text-align:center;
        ">
          <h2 style="margin:0;">
            New Enquiry Received
          </h2>
        </div>

        <div style="padding:25px;">

          <table
            cellpadding="10"
            cellspacing="0"
            width="100%"
            style="
              border-collapse:collapse;
              font-size:15px;
            "
          >

            <tr>
              <td><strong>Name</strong></td>
              <td>${name}</td>
            </tr>

            <tr>
              <td><strong>Email</strong></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td><strong>Phone</strong></td>
              <td>${phone}</td>
            </tr>

            <tr>
              <td><strong>Subject</strong></td>
              <td>${subject}</td>
            </tr>

            <tr>
              <td><strong>Received At</strong></td>
              <td>${new Date().toLocaleString()}</td>
            </tr>

            <tr>
              <td><strong>IP Address</strong></td>
              <td>${ip}</td>
            </tr>

            <tr>
              <td><strong>Location</strong></td>
              <td>${location}</td>
            </tr>

            <tr>
              <td><strong>Browser / Device</strong></td>
              <td>${userAgent}</td>
            </tr>

          </table>

          <hr style="margin:25px 0;" />

          <h3>Message</h3>

          <div style="
            background:#fafafa;
            padding:20px;
            border-radius:10px;
            line-height:1.7;
            border:1px solid #eee;
          ">
            ${message}
          </div>

        </div>

      </div>

    </div>
  `,
});

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {

    console.log("EMAIL ERROR =>", error);

    return NextResponse.json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
}
