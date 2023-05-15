const { BCRYPT_ROUNDS } = require('../tyokalut/config')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Kayttaja = require('../mallit/kayttaja')
const app = require('../app')
const api = supertest(app)

const kayttajanTiedot = { username: 'testi', name: 'Testi', password: 'testi' }

beforeEach(async () => {
  await Kayttaja.deleteMany({})
  await new Kayttaja({
    username: 'santeripe',
    name: 'SanteriPeltokangas',
    passwordHash: await bcrypt.hash('salasana', BCRYPT_ROUNDS),
  }).save()
})

describe('Käyttäjän luonti', () => {
  test('Onnistuu ainutkertaisella käyttäjänimellä', async () => {
    const alkuMaara = await Kayttaja.countDocuments()
    const uusiKayttaja = {
      username: 'enTodellakaanMina',
      name: 'EnTodellakaanMina',
      password: '****',
    }

    await api
      .post('/api/users')
      .send(uusiKayttaja)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(await Kayttaja.countDocuments()).toEqual(alkuMaara + 1)
    expect(await Kayttaja.exists({ username: uusiKayttaja.username })).not.toBeNull()
  })

  test('Epäonnistuu puuttuvilla tiedoilla', () =>
    api.post('/api/users').send({}).expect(400))
  test('Epäonnistuu alle 3-merkkisellä käyttäjänimellä', () =>
    api
      .post('/api/users')
      .send({ ...kayttajanTiedot, username: 'te' })
      .expect(400))
  test('Epäonnistuu alle 3-merkkisellä salasanalla', () =>
    api
      .post('/api/users')
      .send({ ...kayttajanTiedot, password: 'ab' })
      .expect(400))
  test('Epäonnistuu olemassaolevalla käyttäjänimellä', async () => {
    const alkuMaara = await Kayttaja.countDocuments()
    const vastaus = await api
      .post('/api/users')
      .send({ ...kayttajanTiedot, username: 'santeripe' })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(vastaus.body.error).toContain('Kentän username täytyy olla ainutkertainen')
    expect(alkuMaara).toEqual(await Kayttaja.countDocuments())
  })
})

afterAll(() => mongoose.connection.close())