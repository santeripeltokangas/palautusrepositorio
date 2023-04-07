import React from 'react'
import Headeri from './headeri'
import Sisalto from './sisalto'
import Yhteensa from './yhteensa'

const Kurssit = ({kurssit}) =>
  <div>
    {kurssit.map(kurssi =>
      <div key={kurssi.id}>
        <Headeri kurssi={kurssi.nimi} />
        <Sisalto osat={kurssi.osat}/>
        <Yhteensa osat={kurssi.osat}/>
      </div>
    )}
  </div>

export default Kurssit