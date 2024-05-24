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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14 


  return (
    <div>
      <Header courseName={course} />
        <Content part1={part1} exercise1={exercises1} />
        <Content part2={part2} exercise2={exercises2} />
        <Content part3={part3} exercise3={exercises3} />
        <Total exercise={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App