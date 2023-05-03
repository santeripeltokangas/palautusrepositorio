const Persons = ({ persons, nameFilter, onDelete }) => {
    const filteredPeople = persons.filter((person) =>
      person.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
    return filteredPeople.map((person) => (
      <div key={person.name}>
        {person.name} {person.number}{' '}
        <button onClick={() => onDelete(person)}>Poista</button>
      </div>
    ))
  }
  
  export default Persons