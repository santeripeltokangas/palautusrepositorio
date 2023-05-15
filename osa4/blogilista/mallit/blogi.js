const mongoose = require('mongoose')

const blogiMalli = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: String,
    url: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Käyttäjä',
    },
  },
  {
    toJSON: {
      transform: (_dok, esn) => {
        esn.id = esn._id.toString()
        delete esn._id
        delete esn.__v
      },
    },
  }
)

module.exports = mongoose.model('Blogi', blogiMalli)