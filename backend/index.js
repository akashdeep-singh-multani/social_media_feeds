const express = require('express')
const logger = require('./config/logger')
const requestLogger = require('./middleware/requestLogger')
const errorLogger = require('./middleware/errorLogger')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
require('dotenv').config()
const errorHandler = require('./middleware/errorMiddleware')
const passport = require('passport')
require('./config/db')

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const userRoutes = require('./routes/user')
const likeRoutes = require('./routes/likeRoutes')
const { ERROR_MESSAGES } = require('./constants')
const { sendValidationErrors } = require('./utils/response.util')

const app = express()
app.use(
  cors({
    origin: '*', // The URL of your Angular frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.options('*', cors())
app.use(helmet())

app.use(bodyParser.json())
app.use(requestLogger)

app.use(passport.initialize())
require('./config/config')(passport)

app.use('/api/auth', authRoutes)
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.json())
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/user', userRoutes)
app.use('/api/like', likeRoutes)

app.use(errorHandler)
app.use(errorLogger)
app.use((err, req, res) => {
  logger.error(err.mesage || ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
  sendValidationErrors(res, 500, ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
})
module.exports = app
