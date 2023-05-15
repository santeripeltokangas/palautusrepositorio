require('dotenv').config()

const PORT = process.env.PORT || 3003
const JWT_SECRET = process.env.JWT_SECRET
const BCRYPT_ROUNDS = 10

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = {
  PORT,
  JWT_SECRET,
  BCRYPT_ROUNDS,
  MONGODB_URI,
}