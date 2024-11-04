const User = require('../models/user')
const Post = require('../models/post')
const LikePost = require('../models/likePost')
const { emitNewPostLike } = require('../utils/socket.util')
const AppError = require('../utils/AppError')
const LikeComment = require('../models/likeComment')
const { ERROR_MESSAGES, HTTP_STATUS_CODES } = require('../constants')

class LikeService {
  async createPostLike(likerId, postId) {
    const like = new LikePost({ likerId, postId })
    const likedPost = await like.save()
    const userInfo = await User.findById(likerId)
    const postInfo = await Post.findById(postId)
    const postUserInfo = await User.findById(postInfo.userId)

    const modifiedPostLike = likedPost.toObject()
    modifiedPostLike.likername = userInfo.username
    modifiedPostLike.userpostedname = postUserInfo.username

    emitNewPostLike(modifiedPostLike)

    return {
      likerId: like.likerId,
      postId: like.postId,
      _id: like._id,
      createdAt: like.createdAt,
    }
  }

  async getPostLikes(postId) {
    const likes = await LikePost.find({ postId })
    return likes.map((like) => ({
      likerId: like.likerId,
      postId: like.postId,
      _id: like._id,
      createdAt: like.createdAt,
    }))
  }

  async deletePostLikes(likeId) {
    const like = await LikePost.findByIdAndDelete(likeId)
    if (!like)
      throw new AppError(
        ERROR_MESSAGES.LIKE_NOT_FOUND,
        HTTP_STATUS_CODES.NOT_FOUND
      )
    return like
  }

  async createCommentLike(likerId, commentId) {
    const like = new LikeComment({ likerId, commentId })
    await like.save()
    return like
  }

  async getCommentLikes(commentId) {
    const comments = await LikeComment.find({ commentId })
    return comments
  }

  async deleteCommentLikes(commentId) {
    const comment = await Comment.findByIdAndDelete(commentId)
    if (!comment)
      throw new AppError(
        ERROR_MESSAGES.COMMENT_NOT_FOUND,
        HTTP_STATUS_CODES.NOT_FOUND
      )
    return comment
  }
}

module.exports = new LikeService()
