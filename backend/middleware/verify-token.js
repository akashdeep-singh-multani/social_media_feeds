const jwt = require('jsonwebtoken')
const { VALIDATION_MESSAGES, HTTP_STATUS_CODES } = require('../constants')

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token)
    return res
      .status(HTTP_STATUS_CODES.FORBIDDEN)
      .send(VALIDATION_MESSAGES.TOKEN_NOT_AVAILABLE)

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: VALIDATION_MESSAGES.TOKEN_EXPIRED })
    }
    const currentTime = Date.now()
    if (
      currentTime - decoded.lastActivity >
      VALIDATION_MESSAGES.SESSION_TIME_LIMIT
    ) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: VALIDATION_MESSAGES.TOKEN_INACTIVE })
    }
    req.user = decoded
    next()
  })
}

module.exports = verifyToken
