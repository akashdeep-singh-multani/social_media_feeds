const { HTTP_STATUS_CODES, ERROR_MESSAGES } = require('../constants')

const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
  const message = err.isOperational
    ? err.message
    : ERROR_MESSAGES.INTERNAL_SERVER_ERROR
  res.status(statusCode).json({
    success: false,
    message,
  })
}

module.exports = errorHandler
