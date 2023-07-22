/**
 * Default error handler middleware function.
 *
 * This function handles errors that occur during request processing.
 * It sets the HTTP response status to the error's status code or 500 (Internal Server Error) if no status is provided.
 * The error message is sent in the response body as JSON, extracted from the res.locals.error property.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  // Set the HTTP response status to the error's status code or 500 (Internal Server Error)
  res.status(err.status || 500);
  // Send the error message in the response body as JSON
  res.json(res.locals.error);
};

// Export the error handler middleware function
module.exports = {
  errorHandler
};
