const { validationResult } = require('express-validator')
const AppError = require('../utils/AppError')
const AuthService = require('../services/authService')
const {
  sendValidationErrors,
  sendSuccessResponse,
} = require('../utils/response.util')
const { SUCCESS_MESSAGES, HTTP_STATUS_CODES } = require('../constants')
const UserService = require('../services/userService')

exports.login = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array(), HTTP_STATUS_CODES.BAD_REQUEST))
  }
  const { username, password } = req.body
  try {
    const user = await AuthService.login(username, password)
    const token = UserService.generateToken(user)
    res.json({ token, user })
  } catch (error) {
    next(error)
  }
}

exports.signup = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return sendValidationErrors(res, errors.array())
  }
  const { username, password, email } = req.body
  try {
    await AuthService.signup(username, password, email)
    return sendSuccessResponse(
      res,
      HTTP_STATUS_CODES.CREATED,
      {},
      SUCCESS_MESSAGES.USER_CREATION_SUCCESSFUL
    )
  } catch (error) {
    return next(new AppError(error, HTTP_STATUS_CODES.BAD_REQUEST))
  }
}

exports.protectedRoute = (req, res) => {
  return res.json({ message: SUCCESS_MESSAGES.PROTECTED_ROUTE, user: req.user })
}

exports.userInfo = async (req, res, next) => {
  let userId = req.body.userId
  try {
    const user = await AuthService.getUserById(userId)
    return sendSuccessResponse(res, HTTP_STATUS_CODES.OK, user)
  } catch (error) {
    return next(new AppError(error, HTTP_STATUS_CODES.BAD_REQUEST))
  }
}
