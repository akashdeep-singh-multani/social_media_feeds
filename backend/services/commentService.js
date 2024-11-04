const User = require('../models/user')
const Post = require('../models/post')
const { emitNewPostComment } = require('../utils/socket.util')

class CommentService {
  async getCommentsByPostId(postId) {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 })
    const modifiedComments = await Promise.all(
      comments.map(async (comment) => {
        const commentObj = comment.toObject()
        const userInfo = await User.findById(commentObj.commenterId)
        commentObj.commenterInfo = userInfo
        return commentObj
      })
    )
    return modifiedComments
  }

  async createComment(commenterId, postId, text) {
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
  }
}

module.exports = CommentService
