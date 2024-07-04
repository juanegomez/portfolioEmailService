// Load environment variables
require('dotenv').config();

// Configuration object
const config = {
  env: process.env.NODE_ENV || 'dev', // Default to 'dev'
  port: process.env.PORT || '3000', // Default to 3000
};

module.exports = { config };
