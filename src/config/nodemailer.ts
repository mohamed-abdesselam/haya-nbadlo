import nodemailer from 'nodemailer';

// Define environment variables for email credentials
const email = process.env.EMAIL || '';
const pass = process.env.EMAIL_PASS || '';

// Create a transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: email,
    pass,
  },
});

// Define mail options with default values
export const mailOptions = {
  from: {
    name: 'mohamed',
    address: email,
  },
  // The `to` field should be set dynamically when sending an email
};
