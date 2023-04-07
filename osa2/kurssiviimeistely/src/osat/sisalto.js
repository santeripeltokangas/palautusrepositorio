import React from 'react'
import Osa from './osa'

const Sisalto = ({osat}) =>
  <div>
    {osat.map((osa, i) =>
      <Osa avain={i} osa={osa.nimi} harjoitukset={osa.harjoitukset} />
    )}
  </div>

export default Sisalto