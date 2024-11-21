const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index') // Assuming this is your main app file
const { MongoMemoryServer } = require('mongodb-memory-server')
const User = require('../models/user')
const Post = require('../models/post')
const jwt = require('jsonwebtoken')
const {
  HTTP_STATUS_CODES,
  SUCCESS_MESSAGES,
  VALIDATION_MESSAGES,
} = require('../constants')
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')

let mongoServer
let user
let token
let postId

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)

  // Create a user for authentication
  user = new User({
    username: 'testuser',
    email: 'testuser@gmail.com',
    password: 'Test@123',
  })
  await user.save()

  // Generate a JWT token for the user
  token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('GET /posts', () => {
  it('should fetch all posts', async () => {
    const res = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(HTTP_STATUS_CODES.OK)
    expect(res.body.data).toBeInstanceOf(Array)
    expect(res.body.data.length).toBeGreaterThan(0) // Assuming some posts exist
  })

  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/posts')

    expect(res.status).toBe(HTTP_STATUS_CODES.UNAUTHORIZED)
    expect(res.body.message).toBe('Unauthorized')
  })
})

describe('POST /create', () => {
  it('should create a new post with text and image', async () => {
    const form = new FormData()
    form.append('text', 'This is a test post with an image.')
    form.append('userId', user._id.toString())
    form.append(
      'image',
      fs.createReadStream(path.join(__dirname, 'testImage.jpg'))
    ) // Adjust the image path

    const res = await request(app)
      .post('/posts/create')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .send(form)

    expect(res.status).toBe(HTTP_STATUS_CODES.CREATED)
    expect(res.body.message).toBe(SUCCESS_MESSAGES.POST_UPLOAD_SUCCESSFUL)
    expect(res.body.data).toHaveProperty('_id')
    expect(res.body.data).toHaveProperty(
      'text',
      'This is a test post with an image.'
    )
    postId = res.body.data._id // Save the post ID to use in subsequent tests
  })

  it('should return 400 if no text is provided', async () => {
    const form = new FormData()
    form.append('userId', user._id.toString())

    const res = await request(app)
      .post('/posts/create')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .send(form)

    expect(res.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
    expect(res.body.message).toBe(VALIDATION_MESSAGES.POST_TEXT_REQUIRED)
  })

  it('should return 400 if no userId is provided', async () => {
    const form = new FormData()
    form.append('text', 'This is a test post with no userId.')

    const res = await request(app)
      .post('/posts/create')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .send(form)

    expect(res.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
    expect(res.body.message).toBe(VALIDATION_MESSAGES.USERID_REQUIRED)
  })

  it('should return 401 if no token is provided', async () => {
    const form = new FormData()
    form.append('text', 'This is a test post without token.')
    form.append('userId', user._id.toString())

    const res = await request(app)
      .post('/posts/create')
      .set('Content-Type', 'multipart/form-data')
      .send(form)

    expect(res.status).toBe(HTTP_STATUS_CODES.UNAUTHORIZED)
    expect(res.body.message).toBe('Unauthorized')
  })
})

describe('POST /create (Image Upload)', () => {
  it('should upload image for post creation', async () => {
    const form = new FormData()
    form.append('text', 'This post includes an image.')
    form.append('userId', user._id.toString())
    form.append(
      'image',
      fs.createReadStream(path.join(__dirname, 'testImage.jpg'))
    )

    const res = await request(app)
      .post('/posts/create')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .send(form)

    expect(res.status).toBe(HTTP_STATUS_CODES.CREATED)
    expect(res.body.message).toBe(SUCCESS_MESSAGES.POST_UPLOAD_SUCCESSFUL)
    expect(res.body.data).toHaveProperty('image')
  })

  it('should return 400 if image is invalid or missing', async () => {
    const form = new FormData()
    form.append('text', 'This post is missing an image.')
    form.append('userId', user._id.toString())

    const res = await request(app)
      .post('/posts/create')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'multipart/form-data')
      .send(form)

    expect(res.status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
    expect(res.body.message).toBe(VALIDATION_MESSAGES.INVALID_IMAGE)
  })
})
