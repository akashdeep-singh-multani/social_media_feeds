const Post = require('../models/post')
const User = require('../models/user')
const { emitNewPost } = require('../utils/socket.util')

class PostService {
  async getPosts() {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('userId', '_id username image')
    return posts
  }

  async createPost(textInput, filename, userId) {
    const text = textInput
    const newPost = new Post({
      text,
      image: filename,
      userId: userId,
    })
    const savedPost = await newPost.save()
    const userInfo = await User.findById(userId)
    const modifiedPost = savedPost.toObject()
    modifiedPost.username = userInfo.username
    emitNewPost(modifiedPost)
    return savedPost
  }
}

module.exports = PostService
