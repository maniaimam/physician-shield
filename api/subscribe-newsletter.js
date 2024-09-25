import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  const emailMessage = `New newsletter subscription: ${email}`;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'sarah@physicianshield.us',
      pass: process.env.EMAIL_PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      from: '"Physician Shield Newsletter" <sarah@physicianshield.us>',
      to: 'sarah@physicianshield.us',
      subject: 'New Newsletter Subscription',
      text: emailMessage,
    });

    res.status(200).json({ message: 'Subscription successful' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error processing subscription' });
  }
}