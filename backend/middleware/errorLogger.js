const expressWinston = require('express-winston')
const logger = require('../config/logger')

const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
  level: 'error',
})

module.exports = errorLogger
