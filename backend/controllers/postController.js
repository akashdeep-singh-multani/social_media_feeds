const PostService = require('../services/postService')
const AppError = require('../utils/AppError')
const { sendSuccessResponse } = require('../utils/response.util')
const { successMessages, HTTP_STATUS_CODES } = require('../constants')

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await PostService.getPosts()
    return sendSuccessResponse(res, HTTP_STATUS_CODES.OK, posts)
  } catch (error) {
    return next(new AppError(error, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR))
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const savedPost = await PostService.createPost(
      req.body.text,
      req.file ? req.file.filename : null,
      req.body.userId
    )
    return sendSuccessResponse(
      res,
      HTTP_STATUS_CODES.CREATED,
      savedPost,
      successMessages.POST_UPLOAD_SUCCESSFUL
    )
  } catch (error) {
    return next(new AppError(error, HTTP_STATUS_CODES.BAD_REQUEST))
  }
}
