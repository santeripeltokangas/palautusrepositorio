require('express-async-errors')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const varmistusReititys = require('./reitittajat/varmennus')
const kayttajaReititys = require('./reitittajat/kayttajat')
const blogiReititys = require('./reitittajat/blogit')
const apusoftat = require('./tyokalut/apusoftat')
const config = require('./tyokalut/config')
const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(apusoftat.varmenteenPurkaja)
app.use('/api/auth', varmistusReititys)
app.use('/api/users', kayttajaReititys)
app.use('/api/blogs', blogiReititys)
app.use(apusoftat.virheenKasittelija)

module.exports = app