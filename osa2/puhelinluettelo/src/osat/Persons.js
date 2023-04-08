const Persons = ({ persons, nameFilter, onDelete }) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  
    return filteredPersons.map((person) => (
      <div key={person.name}>
        {person.name} {person.number}{' '}
        <button onClick={() => onDelete(person)}>Poista</button>
      </div>
    ));
  };
  
  export default Persons;