// Load environment variables
require('dotenv').config();

// Configuration object
const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || '3000',
  smtp_host: process.env.SMTP_HOST || '',
  smtp_port: process.env.SMTP_PORT || 587,
  smtp_user: process.env.SMTP_USER || '',
  smtp_password: process.env.SMTP_PASSWORD || '',
  default_recipient_email: process.env.DEFAULT_RECIPIENT_EMAIL || '',
};

module.exports = { config };
