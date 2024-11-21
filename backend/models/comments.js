const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  commenterId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  text: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

commentSchema.index({ postId: 1 })
commentSchema.index({ commenterId: 1 })
commentSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Comment', commentSchema)
