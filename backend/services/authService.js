const { VALIDATION_MESSAGES, HTTP_STATUS_CODES } = require('../constants')
const User = require('../models/user')
const AppError = require('../utils/AppError')

class AuthService {
  async login(username, password) {
    const user = await User.findOne({ username })
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError(
        VALIDATION_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS_CODES.UNAUTHORIZED
      )
    }
    return user
  }

  async signup(username, password, email) {
    const newUser = new User({ username, password, email })
    await newUser.save()
  }

  async getUserById(userId) {
    return await User.findById(userId)
  }
}

module.exports = new AuthService()
