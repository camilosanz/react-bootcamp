import React from 'react'

const Header = ({course}) => <h1>{course}</h1>

const Content = ({parts}) => (
  <div>
    {
      parts.map((notes) => (
        <Part key={notes.id} {...notes} />
      ))
    }     
  </div>
)
 
const Part = (props) => {
  const {name, exercises} = props

  return (
  <div>
    <p>{name}</p>
    <p>Number of exercises {exercises}</p>
  </div>
  )
}

const Total = ({parts}) => {
  
  let exercises = [];
  
  parts.map((part) => {
    
    return(
      exercises.push(part.exercises)
    )
  });

  const sum = exercises.reduce((a,b) => a + b);

  return (
    <p>Total number of excercises {sum}</p>
  )
}

export const Course = ({course}) => (
  <div>        
    <Header course={course.name} />
    <Content parts={course.parts} />  
    <Total parts={course.parts} />    
  </div>
)

export default Course; 