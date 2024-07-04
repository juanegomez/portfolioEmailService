// Import necessary modules
const express = require('express');
const cors = require('cors');
const { config } = require('./config/config');
const routerApi = require('./routes');

// Whitelist of allowed origins for CORS
const whitelist = ['https://juanegomez.netlify.app', 'http://localhost:3001'];

// CORS options configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true); // Allow origin
    } else {
      callback(new Error('Not allowed.')); // Block origin
    }
  },
};

// Initialize Express application
const app = express();
const port = config.port;

// Set up middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

// Define root route
app.get('/', (req, res) => {
  res.send('Send Email service.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Set up API routes
routerApi(app);
