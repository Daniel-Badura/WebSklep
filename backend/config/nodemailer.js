import nodemailer from 'nodemailer';


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
    to: '',
    subject: 'Email Confirmation',
    text: ''
};