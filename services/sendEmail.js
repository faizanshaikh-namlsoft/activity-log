const nodemailer = require('nodemailer');
const sendEmail = async (subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        }
      });
  
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.MAIL_TO,
        subject,
        text
      };
  
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  module.exports = sendEmail