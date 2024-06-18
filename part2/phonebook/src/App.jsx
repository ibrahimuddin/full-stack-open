import axios from 'axios'
import { useState, useEffect } from 'react'

const PersonForm = ({addEntry, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return(
    <div>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange}  />
          number : <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = ({filterName, handleFilterNameChange, filteredPersons}) => {
  return (
    <div>
      filter by name : <input value={filterName} onChange={handleFilterNameChange}  />
      <ul>
      {filteredPersons.map(person => <li key={person.name}>{person.name} : {person.number}</li>)}
      </ul>
    </div>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name} : {person.number}</li>)}
      </ul>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  },[])


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
    return persons.filter(person => person.name.toLowerCase()==filterName.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName}
              handleFilterNameChange={handleFilterNameChange}
              filteredPersons={searchName()}

      />

      <h2>Add a new entry</h2>
      <PersonForm addEntry={addEntry}
                  newName={newName} 
                  newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}   
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App