const User = require('../models/user')
const AppError = require('../utils/AppError')
const jwt = require('jsonwebtoken')

const { ERROR_MESSAGES, HTTP_STATUS_CODES } = require('../constants')

class UserService {
  async updateUser(userId, updateData) {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    })
    if (!updatedUser) {
      throw new AppError(
        ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS_CODES.NOT_FOUND
      )
    }
    return updatedUser
  }

  generateToken(user) {
    return jwt.sign(
      { id: user._id, user, lastActivity: Date.now() },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
  }
}

module.exports = UserService
