const PostService = require('../services/postService')
const AppError = require('../utils/AppError')
const { sendSuccessResponse } = require('../utils/response.util')
const { SUCCESS_MESSAGES, HTTP_STATUS_CODES } = require('../constants')
const postService = new PostService()

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await postService.getPosts()
    return sendSuccessResponse(res, HTTP_STATUS_CODES.OK, posts)
  } catch (error) {
    return next(new AppError(error, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR))
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const savedPost = await postService.createPost(
      req.body.text,
      req.file ? req.file.filename : null,
      req.body.userId
    )
    return sendSuccessResponse(
      res,
      HTTP_STATUS_CODES.CREATED,
      savedPost,
      SUCCESS_MESSAGES.POST_UPLOAD_SUCCESSFUL
    )
  } catch (error) {
    return next(new AppError(error, HTTP_STATUS_CODES.BAD_REQUEST))
  }
}
