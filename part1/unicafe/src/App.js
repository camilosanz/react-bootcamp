import React, { useState } from 'react'


const Part = ({part}) => (
  <div>
    <h1>{part.name}</h1>
  </div>
)

const Statistic = (props) => {
  return (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
  )
}

const Statistics = ({clicks}) => {

  const sumAll = clicks[0] + clicks[1] + clicks[2];
  const average = (clicks[0] - clicks[2])/(clicks[0] + clicks[1] + clicks[2]);
  const possitive = [(clicks[0]/(clicks[0] + clicks[1] + clicks[2]))*100, ' %']

  return(
    <table>
      <tbody>
        <Statistic text='Good ' value={clicks[0]}/>
        <Statistic text='Neutral ' value={clicks[1]}/>
        <Statistic text='Bad ' value={clicks[2]}/>
        <Statistic text='All ' value={sumAll}/>
        <Statistic text='Average ' value={average}/>
        <Statistic text='Possitive ' value={possitive}/>
      </tbody>
    </table>
  )
}

const WarningNotUsed = () => {
  return <h3>No feedback given</h3>
} 

const Button = (props) => {
  return <button onClick={props.setValue}>{props.text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (action) => {
    return () => {
      const isGood = action === 'Good';
      const isBad = action === 'Bad';
  
      isGood ? setGood(good + 1) : isBad ? setBad(bad + 1) : setNeutral(neutral + 1)

    }
  }

  const clicks = [good,neutral,bad]

  const result = clicks.filter(click => click !== 0)

  const Content = ({parts}) => (
    <div>
      <Part part={parts[0]} />
      <Button setValue={handleClick(parts[0].section[0])} text={parts[0].section[0]} />
      <Button setValue={handleClick(parts[0].section[1])} text={parts[0].section[1]} />
      <Button setValue={handleClick(parts[0].section[2])} text={parts[0].section[2]} />
      <Part part={parts[1]} /> 
      {result.length === 0 ? (
        <WarningNotUsed />
      ) : (
        <Statistics clicks={clicks}/> 
      )}          
    </div>
  )

  const feedback = {
    parts: [
      {
        name: 'Give feeback',
        section: ['Good','Neutral','Bad']
      },
      {
        name: 'Statistics',
        section: 7
      },
    ]
  }

  return (
    <div>
      <Content parts={feedback.parts} />  
    </div>
  )
}

export default App