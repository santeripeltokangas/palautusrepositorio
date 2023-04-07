import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const kurssit = [
  {
    nimi: 'Half Stack application development',
    id: 1,
    osat: [
      {
        nimi: 'Fundamentals of React',
        harjoitukset: 10,
        id: 1
      },
      {
        nimi: 'Using props to pass data',
        harjoitukset: 7,
        id: 2
      },
      {
        nimi: 'State of a component',
        harjoitukset: 14,
        id: 3
      },
      {
        nimi: 'Redux',
        harjoitukset: 11,
        id: 4
      }
    ]
  },
  {
    nimi: 'Tietotekniikka',
    id: 2,
    osat: [
      {
        nimi: 'Verkon perusteet',
        harjoitukset: 3,
        id: 1
      },
      {
        nimi: 'Koodaus',
        harjoitukset: 7,
        id: 2
      }
    ]
  }
]

ReactDOM.render(<App kurssit={kurssit} />, document.getElementById('root'))