const AppError = require('../utils/AppError')
const LikeService = require('../services/likeService')
const { sendSuccessResponse } = require('../utils/response.util')
const {
  SUCCESS_MESSAGES,
  HTTP_STATUS_CODES,
  ERROR_MESSAGES,
} = require('../constants')

exports.createPostLike = async (req, res, next) => {
  try {
    let response = await LikeService.createPostLike(
      req.body.userId,
      req.params.postId
    )
    return sendSuccessResponse(
      res,
      HTTP_STATUS_CODES.CREATED,
      [response],
      SUCCESS_MESSAGES.POST_LIKE_SUCCESSFUL
    )
  } catch (error) {
    console.log(error)
    return next(
      new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    )
  }
}

exports.getPostLikes = async (req, res, next) => {
  try {
    const likes = await LikeService.getPostLikes(req.params.postId)
    return sendSuccessResponse(res, HTTP_STATUS_CODES.OK, likes)
  } catch (error) {
    return next(
      new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    )
  }
}

exports.deletePostLikes = async (req, res, next) => {
  try {
    await LikeService.deletePostLikes(req.params.likeId)
    return sendSuccessResponse(
      res,
      HTTP_STATUS_CODES.OK,
      {},
      SUCCESS_MESSAGES.POST_LIKE_ROMOVAL_SUCCESSFUL
    )
  } catch (error) {
    return next(error)
  }
}

exports.createCommentLike = async (req, res, next) => {
  try {
    const like = await LikeService.createCommentLike(
      req.body.userId,
      req.params.commentId
    )
    return sendSuccessResponse(
      res,
      HTTP_STATUS_CODES.CREATED,
      like,
      SUCCESS_MESSAGES.COMMENT_LIKE_SUCCESSFUL
    )
  } catch (error) {
    return next(
      new AppError(error.message, ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
    )
  }
}

exports.getCommentLikes = async (req, res, next) => {
  try {
    const comments = await LikeService.getCommentLikes(req.params.commentId)
    return sendSuccessResponse(res, HTTP_STATUS_CODES.OK, comments, '')
  } catch (error) {
    return next(
      new AppError(error.message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    )
  }
}

exports.deleteCommentLikes = async (req, res, next) => {
  try {
    await LikeService.deleteCommentLikes(req.params.commentId)
    return sendSuccessResponse(
      res,
      HTTP_STATUS_CODES.OK,
      {},
      SUCCESS_MESSAGES.COMMENT_LIKE_REMOVAL_SUCCESSFUL
    )
  } catch (error) {
    return next(error)
  }
}
