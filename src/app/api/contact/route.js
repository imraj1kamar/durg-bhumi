import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "booking@durgbhumi.com",
      subject: "New Enquiry from DurgBhumi Website",
      html: `
        <h2>New Booking Enquiry</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Subject:</strong> ${body.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

