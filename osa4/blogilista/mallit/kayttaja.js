const mongoose = require('mongoose')

const malli = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogi',
      },
    ],
  },
  {
    toJSON: {
      transform: (_dok, esn) => {
        esn.id = esn._id.toString()
        delete esn._id
        delete esn.__v
        delete esn.passwordHash
      },
    },
  }
)

module.exports = mongoose.model('Käyttäjä', malli)