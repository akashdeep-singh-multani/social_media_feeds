const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index') // Assuming this is your main app file
const { MongoMemoryServer } = require('mongodb-memory-server')
const User = require('../models/user')
const Post = require('../models/post')
const LikePost = require('../models/likePost')
const LikeComment = require('../models/likeComment')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
  HTTP_STATUS_CODES,
  SUCCESS_MESSAGES,
  VALIDATION_MESSAGES,
} = require('../constants')

let mongoServer
let user
let post
let commentId
let token
let postLikeId
let commentLikeId

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)

  // Create a user for authentication
  const hashedPassword = await bcrypt.hash('Test@123', 10)
  user = new User({
    username: 'test1@gmail.com',
    email: 'test1@gmail.com',
    password: hashedPassword,
  })
  await user.save()

  // Create a post to associate likes with
  post = new Post({
    userId: user._id,
    text: 'This is a test post for likes.',
  })
  await post.save()

  // Generate a JWT token for the user
  token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  // Create comment (optional, to simulate comment like)
  const comment = {
    postId: post._id,
    commenterId: user._id,
    text: 'This is a test comment.',
  }
  const newComment = await request(app)
    .post(`/comments/create`)
    .set('Authorization', `Bearer ${token}`)
    .send(comment)
  commentId = newComment.body.data._id
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('POST /posts/:postId/likes', () => {
  it('should create a like for a post', async () => {
    const res = await request(app)
      .post(`/posts/${post._id}/likes`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: user._id })

    expect(res.status).toBe(HTTP_STATUS_CODES.CREATED)
    expect(res.body.message).toBe(SUCCESS_MESSAGES.POST_LIKE_SUCCESSFUL)
    postLikeId = res.body.data._id
    expect(res.body.data).toHaveProperty('likerId')
    expect(res.body.data).toHaveProperty('postId', post._id.toString())
  })

  it('should return 401 if no token is provided', async () => {
    const res = await request(app)
      .post(`/posts/${post._id}/likes`)
      .send({ userId: user._id })

    expect(res.status).toBe(HTTP_STATUS_CODES.UNAUTHORIZED)
    expect(res.body.message).toBe('Unauthorized')
  })
})

describe('GET /posts/:postId/likes', () => {
  it('should get likes for a post', async () => {
    const res = await request(app)
      .get(`/posts/${post._id}/likes`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.OK)
    expect(res.body.data).toHaveLength(1) // We just created one like in the previous test
    expect(res.body.data[0].postId).toBe(post._id.toString())
  })

  it('should return 404 if no likes are found', async () => {
    const res = await request(app)
      .get(`/posts/${mongoose.Types.ObjectId()}/likes`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.NOT_FOUND)
    expect(res.body.message).toBe('No likes found')
  })
})

describe('DELETE /posts/:postId/likes/:likeId', () => {
  it('should delete a like for a post', async () => {
    const res = await request(app)
      .delete(`/posts/${post._id}/likes/${postLikeId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.OK)
    expect(res.body.message).toBe(SUCCESS_MESSAGES.POST_LIKE_ROMOVAL_SUCCESSFUL)
  })

  it('should return 404 if like not found', async () => {
    const res = await request(app)
      .delete(`/posts/${post._id}/likes/${mongoose.Types.ObjectId()}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.NOT_FOUND)
    expect(res.body.message).toBe('Like not found')
  })
})

describe('POST /comments/:commentId/likes', () => {
  it('should create a like for a comment', async () => {
    const res = await request(app)
      .post(`/comments/${commentId}/likes`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: user._id })

    expect(res.status).toBe(HTTP_STATUS_CODES.CREATED)
    expect(res.body.message).toBe(SUCCESS_MESSAGES.COMMENT_LIKE_SUCCESSFUL)
    commentLikeId = res.body.data._id
    expect(res.body.data).toHaveProperty('likerId')
    expect(res.body.data).toHaveProperty('commentId', commentId)
  })
})

describe('GET /comments/:commentId/likes', () => {
  it('should get likes for a comment', async () => {
    const res = await request(app)
      .get(`/comments/${commentId}/likes`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.OK)
    expect(res.body.data).toHaveLength(1)
    expect(res.body.data[0].commentId).toBe(commentId)
  })
})

describe('DELETE /comments/:commentId/likes/:likeId', () => {
  it('should delete a like for a comment', async () => {
    const res = await request(app)
      .delete(`/comments/${commentId}/likes/${commentLikeId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.OK)
    expect(res.body.message).toBe(
      SUCCESS_MESSAGES.COMMENT_LIKE_REMOVAL_SUCCESSFUL
    )
  })

  it('should return 404 if like not found', async () => {
    const res = await request(app)
      .delete(`/comments/${commentId}/likes/${mongoose.Types.ObjectId()}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.NOT_FOUND)
    expect(res.body.message).toBe('Like not found')
  })
})
