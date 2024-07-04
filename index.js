// Import necessary modules
const express = require('express');
const cors = require('cors');
const { config } = require('./config/config'); // Configuration settings
const routerApi = require('./routes'); // API routes
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/errorHandler'); // Error handling middlewares

// Whitelist for CORS
const whitelist = ['https://juanegomez.netlify.app', 'http://localhost:3001'];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true); // Allow if origin is whitelisted or not specified
    } else {
      callback(new Error('Not allowed.')); // Block if origin is not whitelisted
    }
  },
};

// Initialize Express
const app = express();
const port = config.port;

// Middlewares
app.use(cors(corsOptions)); // CORS middleware
app.use(express.json({ limit: '50mb' })); // JSON body parser with size limit

// Root route
app.get('/', (req, res) => {
  res.send('Send Email service.'); // Basic endpoint response
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Log server start
});

// API routes setup
routerApi(app); // Configure API routes

// Error handling
app.use(logErrors); // Log errors
app.use(boomErrorHandler); // Handle Boom errors
app.use(errorHandler); // General error handler
