const SUCCESS_MESSAGES = {
  POST_UPLOAD_SUCCESSFUL: 'Post uploaded successfully',
  POST_LIKE_SUCCESSFUL: 'Post liked successfully',
  POST_LIKE_ROMOVAL_SUCCESSFUL: 'Post Like removed successfully',
  COMMENT_LIKE_SUCCESSFUL: 'Comment liked successfully',
  COMMENT_LIKE_REMOVAL_SUCCESSFUL: 'Comment Like removed successfully',
  USER_CREATION_SUCCESSFUL: 'User created',
  USER_UPDATION_SUCCESSFUL: 'User updated successfully',
  PROTECTED_ROUTE: 'Protected Route',
  COMMENT_ADD_SUCCESSFUL: 'Comment added successfully',
}

const VALIDATION_MESSAGES = {
  USERID_REQUIRED: 'UserId is required',
  USERNAME_AND_PASSWORD_REQUIRED: 'Username and password are required',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  TOKEN_NOT_AVAILABLE: 'A token is required for authentication',
  TOKEN_EXPIRED: 'Token has expired or is invalid',
  TOKEN_INACTIVE: 'Token expired due to inactivity',
  SESSION_TIME_LIMIT: 150 * 60 * 1000,
  MONGODB_CONNECTION_ERROR: 'MongoDB connection error',
  MONGODB_CONNECTION_SUCCESS: 'Connected to MongoDB Atlas',
  EMAIL_ALREADY_IN_USE: 'Email is already in use',
}

const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  USER_NOT_FOUND: 'User not found',
  LIKE_NOT_FOUND: 'Like not found',
  COMMENT_NOT_FOUND: 'Comment not found',
}

const SERVER_MESSAGES = {
  SERVER_ORIGIN_URL: ['http://localhost:4200', 'http://localhost:53455'],
  ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}

const HTTP_STATUS_CODES = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
}

module.exports = {
  SUCCESS_MESSAGES,
  HTTP_STATUS_CODES,
  ERROR_MESSAGES,
  VALIDATION_MESSAGES,
  SERVER_MESSAGES,
}
