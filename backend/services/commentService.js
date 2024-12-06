const User = require('../models/user')
const Post = require('../models/post')
const { emitNewPostComment } = require('../utils/socket.util')
const { VALIDATION_MESSAGES, HTTP_STATUS_CODES } = require('../constants')
const Comment = require('../models/comments')
const { sendSuccessResponse } = require('../utils/response.util')

class CommentService {
  async getCommentsByPostId(postId) {
    try {
      const comments = await Comment.find({ postId }).sort({ createdAt: -1 })
      if (!comments) {
        throw new Error(VALIDATION_MESSAGES.NO_COMMENTS_FOUND)
      }
      const modifiedComments = await Promise.all(
        comments.map(async (comment) => {
          const commentObj = comment.toObject()
          const userInfo = await User.findById(commentObj.commenterId)
          commentObj.commenterInfo = userInfo
          return commentObj
        })
      )
      return modifiedComments
    } catch (error) {
      throw new Error(
        VALIDATION_MESSAGES.COMMENTS_RETRIEVAL_FAILURE + ` ${error.message}`
      )
    }
  }

  async createComment(commenterId, postId, text) {
    try {
      const newComment = new Comment({ commenterId, postId, text })
      await newComment.save()
      const userInfo = await User.findById(commenterId)
      const postInfo = await Post.findById(postId)
      const postUserInfo = await User.findById(postInfo.userId)
      const modifiedComment = newComment.toObject()

      modifiedComment.commenterInfo = userInfo
      modifiedComment.commentername = userInfo.username
      modifiedComment.userpostedname = postUserInfo.username
      emitNewPostComment(modifiedComment)
      return modifiedComment
    } catch (error) {
      throw new Error(
        VALIDATION_MESSAGES.COMMENTS_CREATION_FAILURE + ` ${error.message}`
      )
    }
  }
}

module.exports = CommentService
