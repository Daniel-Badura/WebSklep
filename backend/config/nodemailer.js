import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
// create transporter
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

// send email
export const mailOptions = {
    from: process.env.SMTP_USER,
    to: 'daniel.badura@outlook.com',
    subject: 'Test Email',
    text: 'This is a test email sent using Nodemailer.'
};

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log('Email sent:', info.response);
//     }
// });
