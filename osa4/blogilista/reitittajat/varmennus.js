const bcrypt = require('bcrypt')
const express = require('express')

const { kirjautumisToken } = require('../tyokalut/varmennus')
const Kayttaja = require('../mallit/kayttaja')

const reitittaja = express.Router()

reitittaja.post('/', async (pyynto, vastaus) => {
  const { username, password } = pyynto.body

  const kayttaja = await Kayttaja.findOne({ username })
  const salasanaOikein =
    kayttaja === null ? false : await bcrypt.compare(password, kayttaja.passwordHash)

  if (!(kayttaja && salasanaOikein))
    return vastaus.status(401).json({
      error: 'Väärä käyttäjänimi tai salasana',
    })

  const token = kirjautumisToken(kayttaja)

  vastaus
    .status(200)
    .send({ token, username: kayttaja.username, name: kayttaja.name })
})

module.exports = reitittaja