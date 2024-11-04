const AppError = require('../utils/AppError')
const CommentService = require('../services/commentService')
const { sendSuccessResponse } = require('../utils/response.util')
const { HTTP_STATUS_CODES, SUCCESS_MESSAGES } = require('../constants')

exports.getCommentsByPostId = async (req, res, next) => {
  try {
    let comments = await CommentService.getCommentsByPostId(req.params.postId)
    return sendSuccessResponse(res, HTTP_STATUS_CODES.OK, { data: comments })
  } catch (error) {
    return next(
      new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    )
  }
}

exports.createComment = async (req, res, next) => {
  const { postId, commenterId, text } = req.body
  try {
    let comment = await CommentService.createComment(commenterId, postId, text)
    return sendSuccessResponse(
      res,
      HTTP_STATUS_CODES.CREATED,
      { data: comment },
      SUCCESS_MESSAGES.COMMENT_ADD_SUCCESSFUL
    )
  } catch (error) {
    return next(new AppError(error.message, HTTP_STATUS_CODES.BAD_REQUEST))
  }
}
