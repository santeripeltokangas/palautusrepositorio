import React from 'react'
import Kurssi from './osat/kurssi'

const App = ({kurssit}) =>
  <div>
    <Kurssi kurssit={kurssit} />
  </div>

export default App