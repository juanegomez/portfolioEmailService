const express = require('express');
const { sendEmailSchema } = require('./../schemas/emailSchema'); // Email validation schema
const validationHandler = require('./../middlewares/validatorHandler'); // Validation middleware
const emailSenderService = require('./../services/emailSenderService');

const emailService = new emailSenderService();
const router = express.Router();

// POST route to send portfolio emails
router.post(
  '/sendPortfolioEmail',
  validationHandler(sendEmailSchema, 'body'), // Validate request body
  async (req, res, next) => {
    try {
      const { email, subject, message } = req.body;
      const response = await emailService.sendPortfolioEmail(
        email,
        subject,
        message,
      );

      res.json(response);
    } catch (error) {
      next(error); // Pass error to error handler
    }
  },
);

module.exports = router;
