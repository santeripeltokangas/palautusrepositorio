import { useEffect, useState } from 'react';

import { Filter, Notification, PersonForm, Persons } from './osat';
import personService from './palvelut/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [nameFilter, setNameFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  const handleNewNameChange = (event) => setNewName(event.target.value);
  const handleNewNumberChange = (event) => setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    const duplicatePerson = persons.find((person) => person.name === newName);

    if (duplicatePerson !== undefined) {
      if (duplicatePerson.number === newNumber)
        return alert(`${newName} on jo listalla.`);
      else if (
        window.confirm(
          `${newName} on jo listalla. Pitäisikö hänen numeronsa korvata antamallasi?`
        )
      ) {
        personService
          .update(duplicatePerson.id, {
            ...duplicatePerson,
            number: newNumber,
          })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            showNotification(`"${newName}" päivitetty.`);
          })
          .catch(() => {
            setPersons(
              persons.filter((person) => person.id !== duplicatePerson.id)
            );
            showNotification(`Ei onnistuttu päivittämään "${newName}".`, 'error');
          });
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((person) => {
          setPersons(persons.concat(person));
          showNotification(`Lisätty listaan "${newName}".`);
        });
    }

    setNewName('');
    setNewNumber('');
  };

  const showNotification = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  const handleDeletePerson = (person) => {
    if (window.confirm(`Poista "${person.name}"?`))
      personService
        .destroy(person.id)
        .then(() =>
          setPersons(
            persons.filter((statePerson) => statePerson.id !== person.id)
          )
        );
  };

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleNameFilterChange = (event) => setNameFilter(event.target.value);

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <h2>Lisää henkilö:</h2>
      <PersonForm
        onSubmit={addPerson}
        valueName={newName}
        onChangeName={handleNewNameChange}
        valueNumber={newNumber}
        onChangeNumber={handleNewNumberChange}
      />
      <h2>Numerot</h2>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        onDelete={handleDeletePerson}
      />
    </div>
  );
};

export default App;