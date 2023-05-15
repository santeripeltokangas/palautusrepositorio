const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('./config')
const lokittaja = require('./lokittaja')
const Kayttaja = require('../mallit/kayttaja')

const varmenteenPurkaja = (pyynto, _vastaus, seuraava) => {
  const varmennus = pyynto.get('authorization')

  if (varmennus && varmennus.toLowerCase().startsWith('bearer '))
    pyynto.authToken = varmennus.substring(7)

  seuraava()
}

const kayttajaPurkaja = async (pyynto, vastaus, seuraava) => {
  const varmenneTieto = jwt.verify(pyynto.authToken, JWT_SECRET)
  const kayttaja = await Kayttaja.findById(varmenneTieto.id)

  if (kayttaja === null)
    return vastaus.status(401).json({ error: 'Varmenteen käyttäjää ei löytynyt' })

  pyynto.authUser = kayttaja
  seuraava()
}

const virheenKasittelija = (virhe, _pyynto, vastaus, seuraava) => {
  if (virhe.name === 'CastError')
    return vastaus.status(400).send({ error: 'väärän muotoinen ID' })
  else if (virhe.name === 'ValidationError')
    return vastaus.status(400).json({ error: virhe.message })
  else if (
    virhe.name === 'MongoServerError' &&
    virhe.code === 11000 // duplicate key
  )
    return vastaus
      .status(400)
      .json({ error: `Kentän ${Object.keys(virhe.keyValue)[0]} täytyy olla ainutkertainen` });
  else if (virhe.name === 'JsonWebTokenError')
    return vastaus.status(401).json({
      error: 'Varmennetoken on puuttuva tai virheellinen',
    })

  lokittaja.virhe(virhe.message)

  seuraava(virhe)
}

module.exports = {
  varmenteenPurkaja,
  kayttajaPurkaja,
  virheenKasittelija,
}