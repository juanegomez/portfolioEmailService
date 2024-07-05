const boom = require('@hapi/boom');

/**
 * Validation middleware using Joi for Express.
 *
 * @param {Joi.Schema} schema - Joi schema to validate the data.
 * @param {string} property - Property in the request containing the data to validate.
 * @returns {function} Express middleware to handle validation.
 */
const validationHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property]; // Data to validate obtained from the request property
    const { error } = schema.validate(data, { abortEarly: false }); // Validate data using Joi schema

    if (error) {
      // If validation errors exist, send a BadRequest error using Boom
      next(boom.badRequest(error));
    }

    // Move to the next middleware if validation is successful
    next();
  };
};

module.exports = validationHandler;
