import axios from 'axios'
import { useEffect, useState } from 'react'

import Country from './osat/maa'
import CountryList from './osat/maalista'
import FormInput from './osat/formInput'

const App = () => {
  const [maat, asetaMaat] = useState([])
  let maaKomponentti = <p>Liikaa maita, rajaa tarkemmin.</p>

  const [maaSuodatin, asetaMaaSuodatin] = useState('')
  const maaSuodinMuuttaja = (event) =>
    asetaMaaSuodatin(event.target.value)

    useEffect(() => {
      axios
        .get('https://restcountries.com/v3.1/all')
        .then((vastaus) =>
        asetaMaat(vastaus.data))
    }, [])

  const suodatetutMaat = maat.filter((country) =>
    country.name.common.toLowerCase().includes(maaSuodatin.toLowerCase())
  )

  if (suodatetutMaat.length === 1)
    maaKomponentti = <Country country={suodatetutMaat[0]} />
  else if (suodatetutMaat.length < 11)
    maaKomponentti = (
      <CountryList
        countries={suodatetutMaat}
        onSelectCountry={(name) =>
          asetaMaaSuodatin(name)}
      />
    )

  return (
    <div>
      <h1>Maat:</h1>
      <FormInput
        value={maaSuodatin}
        onChange={maaSuodinMuuttaja}
        label="Etsi nimen perusteella"
      />
      {maaKomponentti}
    </div>
  )
}

export default App