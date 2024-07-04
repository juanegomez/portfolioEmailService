const express = require('express');
const { sendEmailSchema } = require('./../schemas/emailSchema'); // Importing email validation schema
const validationHandler = require('./../middlewares/validatorHandler'); // Importing validation middleware

const router = express.Router();

// POST route for sending emails
router.post('/send', validationHandler(sendEmailSchema, 'body'), (req, res) => {
  const body = req.body; // Extracting request body
  res.json(body); // Sending back the received body as JSON response
});

module.exports = router;
