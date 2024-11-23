const AppError = require('../utils/AppError')
const { sendSuccessResponse } = require('../utils/response.util')

const {
  VALIDATION_MESSAGES,
  HTTP_STATUS_CODES,
  SUCCESS_MESSAGES,
} = require('../constants')
const UserService = require('../services/userService')
const userService = new UserService()

exports.edit = async (req, res, next) => {
  const updateData = {}
  const userId = req.body.userId
  if (!userId)
    return next(
      new AppError(
        VALIDATION_MESSAGES.USERID_REQUIRED,
        HTTP_STATUS_CODES.BAD_REQUEST
      )
    )
  if (req.body.username) updateData.username = req.body.username
  if (req.file) updateData.image = req.file.filename
  try {
    const updatedUser = await userService.updateUser(userId, updateData)
    const token = userService.generateToken(updatedUser)

    return sendSuccessResponse(
      res,
      200,
      { user: updatedUser, token },
      SUCCESS_MESSAGES.USER_UPDATION_SUCCESSFUL
    )
  } catch (error) {
    return next(error)
  }
}
