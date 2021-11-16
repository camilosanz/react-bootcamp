import React, { useState } from 'react'


const Part = ({part}) => (
  <div>
    <h1>{part.name}</h1>
  </div>
)

const Button = (props) => {
  return <button onClick={props.setValue}>{props.text}</button>
}

const Anecdote = ({value}) => {
  return <p>{value}</p>
}

const Votes = ({value}) => {
  return <p>has {value} votes</p>
}

const App = () => {

  const anecdotes = {
    options: [
      'If it hurts, do it more often',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ],
    sections: [
      {
        name: 'Anecdote of the day',
        buttons: ['vote','next anecdote']
      },
      {
        name: 'Anecdote with most votes',
      },
    ]
  }

  const arrayInit = new Uint8Array(anecdotes.options.length)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(arrayInit)
  const copy = [...points];

  const random = () => {
    return Math.floor(Math.random() * (7 - 0)) + 0
  }

  const handleClick = (action) => {
    return () => {
      const vote = action === 'vote';
      
      vote ? copy[selected] += 1 : setSelected(random);
      setPoints(copy);

    }
  }

  const maxValue = (array) => {
    return array.indexOf(Math.max(...array))
  }

  const Content = ({parts}) => (
    <div>
      <Part part={parts.sections[0]} />
      <Anecdote value={parts.options[selected]} />
      <Votes value={copy[selected]} />
      <Button setValue={handleClick(parts.sections[0].buttons[0])} text={parts.sections[0].buttons[0]} />
      <Button setValue={handleClick(parts.sections[0].buttons[1])} text={parts.sections[0].buttons[1]} />
      <Part part={parts.sections[1]} /> 
      <Anecdote value={parts.options[maxValue(copy)]} />
      <Votes value={copy[maxValue(copy)]} />
    </div>
  )

  return (
    <div>
      <Content parts={anecdotes} />  
    </div>
  )
}

export default App
