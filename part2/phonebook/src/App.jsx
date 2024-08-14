import axios from 'axios'
import { useState, useEffect } from 'react'
import numberService from './services/numbers'

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
      {filteredPersons.map(person => <li key={person.name}>()
        {person.name} : {person.number}
        </li>)}
      </ul>
    </div>
  )
}

const Persons = ({persons, deleteEntry}) => {
  return (
    <div>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name} : {person.number}  <button onClick={() => deleteEntry(person.id)}>Delete</button></li>)}
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
    numberService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  },[])

  const deleteEntry = (id) => {
    if(window.confirm("Do you wish to do so?")){
      numberService
      .deleteEntry(id)
      .then(response => {
        setPersons(persons.filter(person => person.id!==id))
      })
      .catch(error => {
        alert(
          `the name ${persons.id} was already deleted from the server`
        )
      })
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const updateNumber = (id,newNumber) => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(p => p.id===id)
    const updatedPerson = {...person, number:newNumber}

    numberService.
    updateEntry(id,updatedPerson)
    .then(response=>{
      setPersons(persons.map(p=> p.id!==id ? p : response))
    })
  }

  const addEntry = (event) => {
    event.preventDefault()

    console.log(newName in persons)
    const newPerson = {
      name:newName,
      number:newNumber,
      id: Date.now().toString()
    }

    let personExists = false
    persons.forEach(person => {
      if (person.name.toLowerCase() === newPerson.name.toLowerCase()){
        personExists = true
        updateNumber(person.id,newNumber)
        setNewName('')
        setNewNumber('')
      }
    })
    if (!personExists){
      numberService
      .create(newPerson)
      .then(response =>{
        console.log(response)
      })
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
      <Persons persons={persons} deleteEntry={deleteEntry} />
    </div>
  )
}

export default App