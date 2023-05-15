const { JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken')

const kirjautumisToken = (kayttaja) =>
  jwt.sign(
    {
      username: kayttaja.username,
      id: kayttaja._id,
    },
    JWT_SECRET,
    { expiresIn: 3600 }
  )

module.exports = {
  kirjautumisToken,
}