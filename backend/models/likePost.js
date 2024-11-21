const mongoose = require('mongoose')

const likePostSchema = new mongoose.Schema({
  likerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

likePostSchema.index({ likerId: 1 })
likePostSchema.index({ postId: 1 })
likePostSchema.index({ postId: 1, likerId: 1 })

module.exports = mongoose.model('LikePost', likePostSchema)
