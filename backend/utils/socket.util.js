const { Server } = require('socket.io')
const { SERVER_MESSAGES } = require('../constants')
const logger = require('../config/logger')
let io

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: SERVER_MESSAGES.SERVER_ORIGIN_URL,
      methods: SERVER_MESSAGES.ALLOWED_METHODS,
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    logger.info(`New client connected: ${socket.id}`)

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`)
    })
  })
}

const emitNewPost = (post) => {
  if (io) {
    try {
      io.emit('newPost', post)
      io.emit('notification', {
        message: `New post added by ${post.username}`,
        post,
      })
    } catch (error) {
      logger.error('Error emitting new post: ', error)
    }
  } else {
    logger.warn('Socket.io is not initialized')
  }
}

const emitNewPostLike = (likeInfo) => {
  if (io) {
    try {
      io.emit('newPostLike', likeInfo)
      io.emit('notification', {
        message: `${likeInfo.likername} liked the post of ${likeInfo.userpostedname}`,
      })
    } catch (error) {
      logger.error('Error emitting new post like: ', error)
    }
  } else {
    logger.warn('Socket.io is not initialized')
  }
}

const emitNewPostComment = (commentInfo) => {
  if (io) {
    try {
      io.emit('newPostComment', commentInfo)
      io.emit('notification', {
        message: `${commentInfo.commentername} commented on the post of ${commentInfo.userpostedname}`,
      })
    } catch (error) {
      logger.error('Error emitting new post comment: ', error)
    }
  } else {
    logger.warn('Socket.io is not initialized')
  }
}

module.exports = {
  initSocket,
  emitNewPost,
  emitNewPostLike,
  emitNewPostComment,
}
