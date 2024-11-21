const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
})

postSchema.index({ userId: 1 })
postSchema.index({ createdAt: -1 })
postSchema.index({ text: 'text' })

module.exports = mongoose.model('Post', postSchema)
