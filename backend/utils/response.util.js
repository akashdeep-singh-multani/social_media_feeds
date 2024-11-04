/**
 * Sends a success response.
 * @param {Object} res - The response object.
 * @param {number} statusCode - The HTTP status code (default is 200)
 * @param {Object} data - The response data.
 * @param {string} message - Optional success message.
 */

function sendSuccessResponse(res, statusCode = 200, data = {}, message = '') {
  return res.status(statusCode).json({ status: true, message, data })
}

/**
 * Sends a response with validation errors.
 * @param {Object} res - The response object.
 * @param {Array} errors - An array of error messages.
 * @param {number} statusCode - The HTTP status code(default is 400)
 */

function sendValidationErrors(res, errors, statusCode = 400) {
  return res.status(statusCode).json({ errors: errors })
}

module.exports = { sendSuccessResponse, sendValidationErrors }
