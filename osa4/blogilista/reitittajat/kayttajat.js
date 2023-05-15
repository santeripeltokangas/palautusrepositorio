const bcrypt = require('bcrypt')
const express = require('express')

const { BCRYPT_ROUNDS } = require('../tyokalut/config')
const Kayttaja = require('../mallit/kayttaja')

const reitittaja = express.Router()

reitittaja.get('/', async (_pyynto, vastaus) =>
  vastaus.json(
    await Kayttaja.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    })
  )
)

reitittaja.post('/', async (pyynto, vastaus) => {
  const { username, name, password } = pyynto.body

  if (!password || password.length < 3)
    return vastaus.status(400).json({
      error: 'Salasanassa täytyy olla ainakin kolme merkkiä',
    })

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)

  const kayttaja = new Kayttaja({
    username,
    name,
    passwordHash,
  })

  const tallennettuKayttaja = await kayttaja.save()
  vastaus.status(201).json(tallennettuKayttaja)
})

module.exports = reitittaja