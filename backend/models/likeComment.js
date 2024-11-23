const { default: mongoose } = require('mongoose')

const likeCommentSchema = new mongoose.Schema({
  likerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

likeCommentSchema.index({ likerId: 1 })
likeCommentSchema.index({ commentId: 1 })
likeCommentSchema.index({ commentId: 1, likerId: 1 })

module.exports = mongoose.model('LikeComment', likeCommentSchema)
