// Middleware to log errors to the next middleware
const logErrors = (err, req, res, next) => {
  next(err);
};

// General error handler middleware
const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message, // Sends the error message in the response
    stack: err.stack, // Sends the error stack trace in the response
  });
};

// Error handler middleware for Boom errors
const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err; // Retrieves the Boom error output
    res.status(output.statusCode).json(output.payload); // Sends Boom error response payload
  }

  next(err); // Passes the error to the next middleware
};

module.exports = { logErrors, errorHandler, boomErrorHandler };
