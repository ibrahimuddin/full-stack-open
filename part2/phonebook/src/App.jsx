import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filteredNames, setFilteredNames] = useState([{}])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()
    const newPerson = {
      name:newName,
      number:newNumber,
      id:persons.length+1
    }
    let personExists = false
    persons.forEach(person => {
      if (person.name.toLowerCase() === newPerson.name.toLowerCase()){
        personExists = true
        alert(`${newPerson.name} exists in phonebook!`)
      }
    })
    if (!personExists){
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const searchName = () => {
    return persons.filter(person => person.name==filterName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter by name : <input value={filterName} onChange={handleFilterNameChange}  />
      <ul>
      {searchName().map(person => <li key={person.name}>{person.name} : {person.number}</li>)}
      </ul>
      <h2>Add a new entry</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange}  />
          number : <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name} : {person.number}</li>)}
      </ul>
      
    </div>
  )
}

export default App