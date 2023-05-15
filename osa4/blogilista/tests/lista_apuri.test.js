const listaApuri = require('../tyokalut/lista_apuri')

test('Valeblogi palauttaa ykkösen', () => {
  const blogit = []
  const tulos = listaApuri.vale(blogit)
  expect(tulos).toBe(1)
})

const yksittainenBlogi = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const blogit = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

describe('Suosikkiblogi', () => {
  test('Tyhjä blogilista palauttaa null', () =>
    expect(listaApuri.suosikkiBlogi([])).toBeNull())

  test('Yksittäinen blogi', () =>
    expect(listaApuri.suosikkiBlogi(yksittainenBlogi)).toBe(yksittainenBlogi[0]))

  test('Useita blogeja', () =>
    expect(listaApuri.suosikkiBlogi(blogit)).toEqual(blogit[2]))
})

describe('Eniten blogeja', () => {
  test('Tyhjä blogilista palauttaa null', () =>
    expect(listaApuri.enitenBlogeja([])).toBeNull())

  test('Yksittäinen blogi', () =>
    expect(listaApuri.enitenBlogeja(yksittainenBlogi)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    }))

  test('Useita blogeja', () =>
    expect(listaApuri.enitenBlogeja(blogit)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    }))
})

describe('Eniten tykkäyksiä', () => {
  test('Tyhjä blogilista palauttaa nollan', () =>
    expect(listaApuri.enitenTykkayksia([])).toBeNull())

  test('Yksittäinen blogi', () =>
    expect(listaApuri.enitenTykkayksia(yksittainenBlogi)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }))

  test('Useita blogeja', () =>
    expect(listaApuri.enitenTykkayksia(blogit)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }))
})

describe('Kokonaistykkäykset', () => {
  test('Tyhjä blogilista palauttaa nollan', () =>
    expect(listaApuri.yhteensaTykkayksia([])).toBe(0))

  test('Yksittäinen blogi', () => expect(listaApuri.yhteensaTykkayksia(yksittainenBlogi)).toBe(5))

  test('Useita blogeja', () => expect(listaApuri.yhteensaTykkayksia(blogit)).toBe(36))
})