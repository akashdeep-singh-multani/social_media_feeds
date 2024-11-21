const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Post = require('../models/post')
const request = require('supertest')
const {
  HTTP_STATUS_CODES,
  SUCCESS_MESSAGES,
  VALIDATION_MESSAGES,
} = require('../constants')
const jwt = require('jsonwebtoken')
const app = require('../index')

let mongoServer
let user
let postId
let token

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)

  const hashedPassword = await bcrypt.hash('Test@123', 10)
  user = new User({
    username: 'test1@gmail.com',
    email: 'test1@gmail.com',
    password: hashedPassword,
  })
  await user.save()

  const post = new Post({
    userId: user._id,
    text: 'This is a test post for comment testing',
  })

  const savedPost = await post.save()
  postId = savedPost._id

  token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('POST /comments/create', () => {
  it('should create a new comment', async () => {
    const commentData = {
      postId: postId.toString(),
      commenterId: user._id.toString(),
      text: 'This is a test comment',
    }

    const res = await request(app)
      .post('/comments/create')
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)

    expect(res.status).toBe(HTTP_STATUS_CODES.CREATED)
    expect(res.body.message).toBe(SUCCESS_MESSAGES.COMMENT_ADD_SUCCESSFUL)
    expect(res.body.data.text).toBe(commentData.text)
    expect(res.body.data.postId).toBe(commentData.postId)
  })

  it('should return 401 if no token is provided', async () => {
    const commentData = {
      postId: postId.toString(),
      commenterId: user._id.toString(),
      text: 'This is a test comment',
    }

    const res = await request(app).post('/comments/create').send(commentData)

    expect(res.status).toBe(HTTP_STATUS_CODES.UNAUTHORIZED)
    expect(res.body.message).toBe('Unauthorized')
  })

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/comments/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        postId: postId.toString(),
        commenterId: user._id.toString(),
      })
    expect(res.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
    expect(res.body.message).toBe(
      VALIDATION_MESSAGES.NOT_RECEIVED_ALL_REQUIRED_PARAMIDS
    )
  })
})

describe('GET /comments/load/:postId', () => {
  it('should return comments for a specific post', async () => {
    const commentData = {
      postId: postId.toString(),
      commenterId: user._id.toString(),
      text: 'This is a test comment',
    }

    await request(app)
      .post('/comments/create')
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)

    const res = await request(app)
      .get(`/comments/load/${postId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.OK)
    expect(res.body.message).toBe(SUCCESS_MESSAGES.COMMENT_ADD_SUCCESSFUL)
    expect(res.body.data).toHaveLength(1)
    expect(res.body.data[0].text).toBe('This is a test comment')
  })

  it('should return 404 if no comments founds for the post', async () => {
    const res = await request(app)
      .get(`/comments/load/${postId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.NOT_FOUND)
    expect(res.body.message).toBe(VALIDATION_MESSAGES.NO_COMMENTS_FOUND)
  })

  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get(`/comments/load/${postId}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.UNAUTHORIZED)
    expect(res.body.message).toBe('Unauthorized')
  })

  it('should return 400 if postId is missing', async () => {
    const res = await request(app)
      .get('/comments/load/')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
    expect(res.body.message).toBe(VALIDATION_MESSAGES.POSTID_REQUIRED)
  })
})
