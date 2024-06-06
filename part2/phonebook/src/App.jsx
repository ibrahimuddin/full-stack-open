import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name:newName,
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
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <ul key={person.name}>{person.name}</ul>)}
      </ul>
      
    </div>
  )
}

export default App