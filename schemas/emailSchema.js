const joi = require('joi'); // Import Joi for schema validation

// Define Joi schemas
const email = joi.string().email();
const subject = joi.string().max(150);
const message = joi.string().max(500);

// Define schema for sending email
const sendEmailSchema = joi.object({
  email: email.required(),
  subject: subject.required(),
  message: message.required(),
});

module.exports = { sendEmailSchema };
