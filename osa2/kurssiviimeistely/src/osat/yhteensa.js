import React from 'react'

const Yhteensa = ({osat}) => {
    const total = osat.reduce((s, p) => s + p.harjoitukset, 0)

    return (
        <p>Harjoituksia on yhteensä {total}</p>
    )
  }

export default Yhteensa