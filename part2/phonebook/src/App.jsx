import axios from 'axios'
import { useState, useEffect } from 'react'
import numberService from './services/numbers'
import './index.css'

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      <p>{message}</p>
    </div>
  )
}

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
      {filteredPersons.map(person => <li key={person.name}>
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
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
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
    const person = persons.find(p => p.id===id)
    if(window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)){
      const updatedPerson = {...person, number:newNumber}

      numberService.
      updateEntry(id,updatedPerson)
      .then(response=>{
        setPersons(persons.map(p=> p.id!==id ? p : response))
      })
    } 
  }

  const addEntry = (event) => {
    event.preventDefault()

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
        setSuccessMessage("Success!")
        setPersons(persons.concat(newPerson))
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      })
        .catch(error => {
          console.log(error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
      })
      setNewName('')
      setNewNumber('')
      setErrorMessage('')
    }
  }

  const searchName = () => {
    return persons.filter(person => person.name.toLowerCase()==filterName.toLowerCase())
  }
  console.log("persons: ", persons)
  


  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
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