import axios from 'axios'
import React, { useState, useEffect } from 'react';
import {Note} from './Note.js';
import noteService from './services/notes'


export default function App() {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('')

  const Notification = ({ message }) => {
    if (message === '') {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const Footer = () => {  
    const footerStyle = {    
      color: 'green',    
      fontStyle: 'italic',    
      fontSize: 16  
    }  
    return (    
      <div style={footerStyle}>      
        <br />      
        <em>Note app, Department of Computer Science, University of Helsinki 2021</em>    
      </div>  
    )
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })

    noteService      
      .getAll()      
      .then(initialNotes => {        
        setNotes(initialNotes)      
    })

  }, [])
  console.log('render', notes.length, 'notes')

  // useEffect(() => {
  //   console.log('effect')

  //   const eventHandler = response => {
  //     console.log('promise fulfilled')
  //     setNotes(response.data)
  //   }

  //   const promise = axios.get('http://localhost:3001/notes')
  //   promise.then(eventHandler)
  // }, [])

  const handleShowAll = (event) => {
    setShowAll(() => !showAll);
  }

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("crear nota");
    
    const noteToAddToState = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    };

    noteService      
      .create(noteToAddToState)      
      .then(returnedNote => {        
        setNotes(notes.concat(returnedNote))        
        setNewNote('')      
      })
  };

  const toggleImportanceOf = (id) => {    
    console.log(`importance of ${id} needs to be toggled`) 
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService      
      .update(id, changedNote)      
      .then(returnedNote => {        
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))      
      }) 
      .catch(error => {      
        setErrorMessage(          
          `Note '${note.content}' was already removed from server`        
        )        
        setTimeout(() => {          
          setErrorMessage(null)        
        }, 3000)
        setNotes(notes.filter(n => n.id !== id))    
      })
  }

  if(typeof notes === "undefined" || notes.length === 0) {
    return "No tenemos notas que mostrar";
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={handleShowAll}>{showAll ? "Show only important" : "Show All"}</button>
      <ol>
        {notes
          .filter((note) => {
            if (showAll === true) return true;
            return note.important === true;
          })  
          .map((notes) => (
            <Note 
              key={notes.id}               
              note={notes} 
              toggleImportance={() => toggleImportanceOf(notes.id)}
            />
          ))
        }
      </ol>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote}/>
        <button>Crear nota</button>
      </form>
      <Footer />
    </div>
  );
}
