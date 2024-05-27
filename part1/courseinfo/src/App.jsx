const Header = (props) => {
  return(
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercises={props.exercise1}/>
      <Part part={props.part2} exercises={props.exercise2} />
      <Part part={props.part3} exercises={props.exercise3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises :{props.exercise} </p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name : 'Fundamentals of React',
    exercises : 10
  }
  const part2 = {
    name : 'Using props to pass data',
    exercises : 7
  }
  const part3 = {
    name : 'State of a component',
    exercises : 14
  }


  return (
    <div>
      <Header courseName={course} />
        <Content part1={part1.name} exercise1={part1.exercises} />
        <Content part2={part2.name} exercise2={part2.exercises} />
        <Content part3={part3.name} exercise3={part3.exercises} />
        <Total exercise={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App