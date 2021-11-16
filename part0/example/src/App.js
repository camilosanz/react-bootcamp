import React from 'react';
import {useState} from 'react';
import {Note} from './Note.js';


export default function App(props) {

  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true);

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
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    };

    // setNotes(notes.concat(noteToAddToState));
    setNotes([...notes, noteToAddToState]);
    setNewNote("");
    // {
    //   id: 1,
    //   content: 'HTML is easy',
    //   date: '2019-05-30T17:30:31.098Z',
    //   important: true
    // }
  };

  if(typeof notes === "undefined" || notes.length === 0) {
    return "No tenemos notas que mostrar";
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>{showAll ? "Show only important" : "Show All"}</button>
      <ol>
        {notes
          .filter((note) => {
            if (showAll === true) return true;
            return note.important === true;
          })
          .map((notes) => (
            <Note key={notes.id} {...notes} />
          ))
        }
      </ol>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote}/>
        <button>Crear nota</button>
      </form>
    </div>
  );
}
