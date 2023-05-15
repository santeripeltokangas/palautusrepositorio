const vale = (_blogit) => 1

const suosikkiBlogi = (blogit) =>
  blogit.length
    ? blogit.reduce((suosikki, nykyinen) =>
        nykyinen.likes > suosikki.likes ? nykyinen : suosikki
      )
    : null

const enitenPohja = (tyyppi, blogit, callback) => {
  if (!blogit.length) return null

  let kerrat = {}

  blogit.forEach((blogi) => callback(blogi, kerrat))

  const korkeinMaara = Object.entries(kerrat).reduce((valittu, nykyinen) =>
    nykyinen[1] > valittu[1] ? nykyinen : valittu
  )

  return {
    author: korkeinMaara[0],
    [tyyppi]: korkeinMaara[1],
  }
}

const enitenBlogeja = (blogit) =>
  enitenPohja(
    'blogs',
    blogit,
    (blog, counts) => (counts[blog.author] = (counts[blog.author] ?? 0) + 1)
  )

const enitenTykkayksia = (blogit) =>
  enitenPohja(
    'likes',
    blogit,
    (blogi, kerrat) =>
      (kerrat[blogi.author] = (kerrat[blogi.author] ?? 0) + blogi.likes)
  )

const yhteensaTykkayksia = (blogit) => blogit.reduce((summa, blogi) => summa + blogi.likes, 0)

module.exports = {
  vale,
  suosikkiBlogi,
  enitenBlogeja,
  enitenTykkayksia,
  yhteensaTykkayksia,
}