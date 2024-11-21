const AppError = require('../utils/AppError')
const CommentService = require('../services/commentService')
const { sendSuccessResponse } = require('../utils/response.util')
const {
  HTTP_STATUS_CODES,
  SUCCESS_MESSAGES,
  VALIDATION_MESSAGES,
} = require('../constants')

exports.getCommentsByPostId = async (req, res, next) => {
  try {
    const postId = req.params.postId
    if (!postId) {
      return next(
        new AppError(
          VALIDATION_MESSAGES.POSTID_REQUIRED,
          HTTP_STATUS_CODES.BAD_REQUEST
        )
      )
    }
    let comments = await CommentService.getCommentsByPostId(req.params.postId)
    if (comments.length === 0) {
      return next(
        new AppError(
          VALIDATION_MESSAGES.NO_COMMENTS_FOUND,
          HTTP_STATUS_CODES.NOT_FOUND
        )
      )
    }
    return sendSuccessResponse(res, HTTP_STATUS_CODES.OK, { data: comments })
  } catch (error) {
    return next(
      new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    )
  }
}

exports.createComment = async (req, res, next) => {
  const { postId, commenterId, text } = req.body
  if (!postId || !commenterId || !text) {
    return next(
      new AppError(
        VALIDATION_MESSAGES.NOT_RECEIVED_ALL_REQUIRED_PARAMIDS,
        HTTP_STATUS_CODES.BAD_REQUEST
      )
    )
  }
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
