const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const avustaja = require('./blog_api_testiavustaja')
const Blogi = require('../mallit/blogi')
const api = supertest(app)

beforeEach(async () => {
  await Blogi.deleteMany({})
  await Promise.all(avustaja.alkuBlogit.map((blog) => new Blogi(blog).save()))
})

describe('Indeksoidaan blogeja', () => {
  test('Tiedon tyyppi on JSON', () =>
    api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/))

  test('Kaikki blogit ovat listassa', async () => {
    const vastaus = await api.get('/api/blogs')
    expect(vastaus.body).toHaveLength(avustaja.alkuBlogit.length)
  })

  test('Erottajan edessä ei ole alaviivaa', async () => {
    const blogi = (await api.get('/api/blogs')).body[0]
    expect(blogi._id).toBeUndefined()
    expect(blogi.id).toBeDefined()
  })
})

describe('Blogin luonti', () => {
  let kayttaja
  beforeEach(async () => (kayttaja = await avustaja.alkuKayttajat()))

  test('Onnistuu oikeilla tiedoilla', async () => {
    await api
      .post('/api/blogs')
      .set(avustaja.varmenneOtsikko(kayttaja))
      .send(avustaja.esimerkkiBlogi)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const loppuBlogit = await avustaja.blogitKannassa()
    expect(loppuBlogit).toHaveLength(avustaja.alkuBlogit.length + 1)
    expect(loppuBlogit.map((blog) => blog.title)).toContain(
      avustaja.esimerkkiBlogi.title
    )
  })

  test('Tykkäykset ovat oletuksena nolla', async () => {
    const vastaus = await api
      .post('/api/blogs')
      .set(avustaja.varmenneOtsikko(kayttaja))
      .send(avustaja.esimerkkiBlogi)
      .expect(201)

    expect(vastaus.body.likes).toEqual(0)
  })

  test('Epäonnistuu puuttuvilla arvoilla', () =>
    api
      .post('/api/blogs')
      .set(avustaja.varmenneOtsikko(kayttaja))
      .send({})
      .expect(400))

  test('Epäonnistuu puuttuvalla varmenteella', () =>
    api.post('/api/blogs').send(avustaja.esimerkkiBlogi).expect(401))
})

describe('Blogin päivitys', () => {
  test('Onnistuu oikealla ID:llä ja datalla', async () => {
    const alkuBlogi = await Blogi.findOne({
      title: { $ne: avustaja.esimerkkiBlogi.title },
    })

    await api
      .put(`/api/blogs/${alkuBlogi.id}`)
      .send(avustaja.esimerkkiBlogi)
      .expect(200)

    const blogi = await Blogi.findById(alkuBlogi.id)

    for (const key of Object.keys(avustaja.esimerkkiBlogi))
      expect(blogi[key]).toEqual(avustaja.esimerkkiBlogi[key])
  })

  test('Epäonnistuu virheellisellä ID:llä', async () =>
    api
      .put(`/api/blogs/${await avustaja.olematonID()}`)
      .send(avustaja.esimerkkiBlogi)
      .expect(404))

  test('Epäonnistuu puuttuvilla ominaisuuksilla', async () => {
    const alkuBlogi = await Blogi.findOne({})
    await api.put(`/api/blogs/${alkuBlogi.id}`).send({}).expect(400)
  })
})

describe('Blogin poisto', () => {
  let kayttaja
  beforeEach(async () => (kayttaja = await avustaja.alkuKayttajat()))

  test('Onnistuu oikeanlaisella ID:llä', async () => {
    const blogi = await Blogi.create({ ...avustaja.esimerkkiBlogi, user: kayttaja._id })

    await api
      .delete(`/api/blogs/${blogi.id}`)
      .set(avustaja.varmenneOtsikko(kayttaja))
      .expect(204)

    expect((await avustaja.blogitKannassa()).map((b) => b.id)).not.toContain(blogi.id)
  })
})

afterAll(() => mongoose.connection.close())