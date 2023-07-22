/**
 * 404 Not Found handler middleware function.
 *
 * This function is used to handle requests for routes or resources that do not exist.
 * It generates a 404 Not Found error using the createHttpError module and passes it to the next middleware.
 * The error message indicates that the requested content was not found.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const createHttpError = require("http-errors");

const notFoundHandler = (req, res, next) => {
    // Create a 404 Not Found error and pass it to the next middleware
    next(createHttpError(404, "The requested content was not found."));
};

// Export the 404 Not Found handler middleware function
module.exports = {
    notFoundHandler
};
