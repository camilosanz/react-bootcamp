import React, { useState, useEffect } from 'react'
import { Filter } from './Filter.js';
import { PersonForm } from './PersonForm.js';
import { Persons } from './Persons.js';
import axios from 'axios';
import personsService from './services/persons';
import { Notification } from './Notification.js';

const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newFilter, setNewFilter ] = useState({value:'', state: true});
  const [errorMessage, setErrorMessage] = useState({value:'', type:''});

  useEffect(() => {
    console.log('effect')
    axios
      .get('/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })

    personsService      
      .getAll()      
      .then(initialPersons => {        
        setPersons(initialPersons)      
    })

  }, [])

  const handleChangeName = (event) => {
    setNewName(event.target.value);
    console.log(newName)
  };

  const handleChangePhone = (event) => {
    setNewNumber(event.target.value);
    console.log(newNumber)
  };

  const handleChangeFilter = (event) => {

    const filter = {
      value: event.target.value,
      state: (() => !(newFilter.state))
    }
    setNewFilter(filter);

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("crear nota");

    const nameToAddToState = {
      name: newName,
      number: newNumber,
    };

    if(persons.filter(person => person.name === nameToAddToState.name).length >= 1 ){
      if(window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) { 
        if(persons.filter(person => person.number === nameToAddToState.number).length >= 1){
          alert(`${newNumber} is already added to phonebook`)
        }else{
          const personToUpdate = persons.find(n => n.name === nameToAddToState.name)

          personsService      
            .update(personToUpdate.id, nameToAddToState)      
            .then(returnedPerson => {        
              setPersons(persons.map(
                person => person.id !== personToUpdate.id 
                ? person : returnedPerson
              ))
              setErrorMessage(
                {
                  value: `Updated ${nameToAddToState.name}`,
                  type: 'success'
                }
              )        
              setTimeout(() => {          
                setErrorMessage({...errorMessage, value:''})        
              }, 3000)       
            })
            .catch(error => {      
              console.log(error.response.data)
              setErrorMessage(
                {
                  value: error.response.data.error,
                  type: 'failure'
                }
              )        
              setTimeout(() => {          
                setErrorMessage({value:'', type:''})        
              }, 3000)     
            })
        } 
      }
    }else{
      personsService      
      .create(nameToAddToState)      
      .then(returnedPerson => {        
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNumber("");
        setErrorMessage(
          {
            value: `Added ${nameToAddToState.name}`,
            type: 'success'
          }
        )        
        setTimeout(() => {          
          setErrorMessage({value:'', type:''})        
        }, 3000)    
      })
      .catch(error => {      
        console.log(error.response.data)
        setErrorMessage(
          {
            value: error.response.data.error,
            type: 'failure'
          }
        )        
        setTimeout(() => {          
          setErrorMessage({value:'', type:''})        
        }, 3000)     
      })
    }   
  };

  const handleDelete = (id) => {
    const person = persons.find(n => n.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personsService      
      .del(id)      
      .then(    
        setPersons(persons.filter(n => n.id !== id)),    
        setErrorMessage( 
          {
            value: `${person.name} has been deleted`,
            type: 'failure'
          }
        ),
        setTimeout(() => {          
          setErrorMessage({value:'', type:''})        
        }, 3000) 
      )
      .catch(error => {      
        setErrorMessage( 
          {
            value: `Information of ${person.name} has already been removed from server`,
            type: 'failure'
          }
        )        
        setTimeout(() => {          
          setErrorMessage({value:'', type:''})        
        }, 3000)      
        setPersons(persons.filter(n => n.id !== person.id))    
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification {...errorMessage} />
      <Filter setValue={handleChangeFilter} text={newFilter.value}/>
      <h3>Add a new</h3>
      <PersonForm 
        setForm={handleSubmit}
        setNameValue={handleChangeName} 
        setNumberValue={handleChangePhone} 
        textName={newName} 
        textNumber={newNumber} 
      />
      <h2>Numbers</h2>
      {persons
        .filter((person) => {
          if(newFilter.state === true) return true;
          return person.name.toLowerCase().startsWith(newFilter.value.toLowerCase());
        })
        .map((person) => (
          <div key={person.name}>
            <Persons {...person} action={() => handleDelete(person.id)}/>
          </div>
        ))}
    </div>
  )
}

export default App
