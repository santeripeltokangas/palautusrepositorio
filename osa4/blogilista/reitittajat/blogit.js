const express = require('express')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../tyokalut/config')
const Blogi = require('../mallit/blogi')
const apusofta = require('../tyokalut/apusoftat')

const reitittaja = express.Router()

reitittaja.get('/', async (_pyynto, vastaus) => {
  const blogit = await Blogi.find({}).populate('user', { username: 1, name: 1 })
  vastaus.json(blogit)
})

reitittaja.post('/', apusofta.kayttajaPurkaja, async (pyynto, vastaus) => {
  const { title, author, url, likes } = pyynto.body
  const kayttaja = pyynto.authUser

  const blogi = new Blogi({ title, author, url, likes, user: kayttaja._id })

  const tallennettuBlogi = await blogi.save()
  kayttaja.blogs.push(tallennettuBlogi._id)
  await kayttaja.save()

  vastaus.status(201).json(tallennettuBlogi)
})

reitittaja.put('/:id', async (pyynto, vastaus) => {
  const { title, author, url, likes } = pyynto.body

  const blogi = await Blogi.findByIdAndUpdate(
    pyynto.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, overwrite: true }
  )

  if (blogi === null) return vastaus.status(404).end()
  vastaus.json(blogi)
})

reitittaja.delete('/:id', async (pyynto, vastaus) => {
  const authPayload = jwt.verify(pyynto.authToken, JWT_SECRET)
  const blogi = await Blogi.findById(pyynto.params.id)

  if (!blogi) return vastaus.status(204).end()

  if (blogi.user._id.toString() !== authPayload.id)
    return vastaus.status(403).json({ error: 'Blogi kuuluu toiselle käyttäjälle' })

  await blogi.remove()
  vastaus.status(204).end()
})

module.exports = reitittaja