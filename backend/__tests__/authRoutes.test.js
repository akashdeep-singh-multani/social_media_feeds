const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const { MongoMemoryServer } = require('mongodb-memory-server')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { HTTP_STATUS_CODES, SUCCESS_MESSAGES } = require('../constants')

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)

  const hashedPassword = await bcrypt.hash('Test@123', 10)
  const user = new User({
    username: 'test1@gmail.com',
    email: 'test1@gmail.com',
    password: hashedPassword,
  })
  await user.save()
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('POST /api/auth/login', () => {
  it('should return a 200 status and user data with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'test1@gmail.com',
      password: 'Test@123',
    })
    expect(res.status).toBe(200)
  })

  it('should return 400 when no credentials are provided', async () => {
    const res = await request(app).post('/api/auth/login').send({})
    expect(res.status).toBe(400)
  })

  it('should return 400 when invalid credentials are provided', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'test2@gmail.com',
      password: 'Test@123',
    })
    expect(res.status).toBe(400)
  })
})

describe('POST /api/auth/signup', () => {
  it('should return a 201 status and success message when signup is successful', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      username: 'newuser1@gmail.com',
      password: 'Test@123',
      email: 'newuser1@gmail.com',
    })

    expect(res.status).toBe(HTTP_STATUS_CODES.CREATED)
    expect(res.body.message).toBe(SUCCESS_MESSAGES.USER_CREATION_SUCCESSFUL)
  })

  it('should return 400 when required fields are missing', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      username: '',
      password: '',
      email: '',
    })

    expect(res.status).toBe(400)
    expect(res.body.errors).toBeDefined()
  })

  it('should return 400 when password is not strong enough', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      username: 'weakpassworduser1@gmail.com',
      password: '123',
      email: 'weakpassworduser1@gmail.com',
    })

    expect(res.status).toBe(400)
  })
})
