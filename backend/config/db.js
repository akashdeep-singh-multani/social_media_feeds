const mongoose = require('mongoose')
require('dotenv').config()
const logger = require('./logger')
const { VALIDATION_MESSAGES } = require('../constants')

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info(VALIDATION_MESSAGES.MONGODB_CONNECTION_SUCCESS)
  })
  .catch((error) => {
    logger.error(VALIDATION_MESSAGES.MONGODB_CONNECTION_ERROR + ':', error)
  })

const db = mongoose.connection
db.on('error', (error) => {
  logger.error(
    `${VALIDATION_MESSAGES.MONGODB_CONNECTION_ERROR}: ${error.message}`
  )
})
