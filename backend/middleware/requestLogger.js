const expressWinston = require('express-winston')
const logger = require('../config/logger')

const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  level: 'http',
  msg: 'HTTP {{req.method}} {{req.url}}',
  colorize: true,
})

module.exports = requestLogger
