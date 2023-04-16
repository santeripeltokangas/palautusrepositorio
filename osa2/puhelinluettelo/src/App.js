import { useEffect, useState } from 'react'

import Filter from './osat/Filter'
import Notification from './osat/Notification'
import PersonForm from './osat/PersonForm'
import Persons from './osat/Persons'
import personService from './palvelut/persons'

const App = () => {
  const [ihmiset, asetaIhmiset] = useState([])
  const [uusiNimi, asetaUusiNimi] = useState('')
  const [uusiNumero, asetaUusiNumero] = useState('')

  const [nimiFiltteri, asetaNimiFiltteri] = useState('')
  const [ilmoitusViesti, asetaIlmoitusViesti] = useState(null)
  const [ilmoitusTyyppi, asetaIlmoitusTyyppi] = useState('')

  const lisaaIhminen = (event) => {
    event.preventDefault()

    const duplicatePerson = ihmiset.find((person) => person.name === uusiNimi);

    if (duplicatePerson !== undefined) {
      if (duplicatePerson.number === uusiNumero)
        return alert(`${uusiNimi} on jo listalla.`)
      else if (
        window.confirm(
          `${uusiNimi} on jo listalla. Pitäisikö hänen numeronsa korvata antamallasi?`
        )
      ) {
        personService
          .update(duplicatePerson.id, {
            ...duplicatePerson,
            number: uusiNumero,
          })
          .then((updatedPerson) => {
            asetaIhmiset(
              ihmiset.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            )
            naytaIlmoitus(`"${uusiNimi}" päivitetty.`);
          })
          .catch(() => {
            asetaIhmiset(
              ihmiset.filter((person) => person.id !== duplicatePerson.id)
            )
            naytaIlmoitus(`Ei onnistuttu päivittämään "${uusiNimi}".`, 'error');
          })
      }
    } else {
      personService
        .create({ name: uusiNimi, number: uusiNumero })
        .then((person) => {
          asetaIhmiset(ihmiset.concat(person));
          naytaIlmoitus(`Lisätty listaan "${uusiNimi}".`)
        })
    }

    asetaUusiNimi('')
    asetaUusiNumero('')
  }

  const handleNewNameChange = (event) => asetaUusiNimi(event.target.value)
  const handleNewNumberChange = (event) => asetaUusiNumero(event.target.value)

  const naytaIlmoitus = (message, type = 'success') => {
    asetaIlmoitusViesti(message);
    asetaIlmoitusTyyppi(type);
    setTimeout(() => asetaIlmoitusViesti(null), 3000)
  }

  const handleDeletePerson = (person) => {
    if (window.confirm(`Poista "${person.name}"?`))
      personService
        .destroy(person.id)
        .then(() =>
          asetaIhmiset(
            ihmiset.filter((statePerson) =>
            statePerson.id !== person.id)
          )
        )
  }

  useEffect(() => {
    personService.getAll().then((persons) =>
    asetaIhmiset(persons))
  }, [])

  const handleNameFilterChange = (event)=>
  asetaNimiFiltteri(event.target.value)

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification message={ilmoitusViesti} type={ilmoitusTyyppi} />
      <Filter value={nimiFiltteri} onChange={handleNameFilterChange} />
      <h2>Lisää henkilö:</h2>
      <PersonForm
        onSubmit={lisaaIhminen}
        onChangeName={handleNewNameChange}
        onChangeNumber={handleNewNumberChange}
        valueName={uusiNimi}
        valueNumber={uusiNumero}
      />
      <h2>Numerot</h2>
      <Persons
        persons={ihmiset}
        onDelete={handleDeletePerson}
        nameFilter={nimiFiltteri}
      />
    </div>
  )
}

export default App