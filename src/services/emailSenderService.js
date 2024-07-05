const boom = require('@hapi/boom');
const { config } = require('./../config/config');
const nodemailer = require('nodemailer');

class EmailSenderService {
  constructor() {
    // SMTP configuration
    this.smtpConfig = {
      host: config.smtp_host,
      port: config.smtp_port,
      secure: false,
      auth: {
        user: config.smtp_user,
        pass: config.smtp_password,
      },
    };

    // Initialize transporter
    this.transporter = nodemailer.createTransport(this.smtpConfig);
  }

  async sendEmail(html, subject, from, to) {
    try {
      const mailOptions = {
        from,
        to,
        subject,
        html,
      };

      // Sending email
      await this.transporter.sendMail(mailOptions);

      return {
        statusCode: 200,
        message: 'Email sent.',
      };
    } catch (error) {
      console.error('Error sending the email:', error);
      throw boom.internal('Error sending the email.');
    }
  }

  // Function to create and send a portfolio email
  async sendPortfolioEmail(email, subject, message) {
    const emailSubject = 'Nuevo mensaje desde tu portafolio'; // Static email subject
    const emailTemplate = `
      <div style="text-align: center; font-size: 24px; margin-top: 20px; font-family: 'Helvetica Neue', Arial, sans-serif;">
        <strong>¡Haz recibido un nuevo mensaje!</strong>
      </div>
      
      <div style="margin-top: 20px; font-family: 'Helvetica Neue', Arial, sans-serif;">
        <span style="font-weight: bold;">Email:</span>
        <span>${email}</span>
        <br>
        <span style="font-weight: bold;">Subject:</span>
        <span>${subject}</span>
        <br><br>
        <span style="font-weight: bold;">Mensaje:</span>
        <span>${message}</span>
      </div>
    `; // Email HTML template

    return this.sendEmail(
      emailTemplate,
      emailSubject,
      config.smtp_user,
      config.default_recipient_email,
    ); // Sending the email using sendEmail method
  }
}

module.exports = EmailSenderService;
