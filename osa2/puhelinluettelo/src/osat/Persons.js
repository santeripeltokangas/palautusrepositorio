const Persons = ({ persons, nameFilter, onDelete }) => {
    const suodatetutHenkilot = persons.filter((person) =>
      person.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
    return suodatetutHenkilot.map((henkilo) => (
      <div key={henkilo.name}>
        {henkilo.name} {henkilo.number}{' '}
        <button onClick={() => onDelete(henkilo)}>Poista</button>
      </div>
    ))
  }
  
  export default Persons