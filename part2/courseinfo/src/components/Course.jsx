const Header = ({course}) => {
    return <h1>{course}</h1>
  }
  
const Total = ({parts}) => {
    const total = parts.reduce((acc,part) =>{
    return acc +=part.exercises
    } ,0)
    return <p>Number of exercises {total}</p>
}
  
const Part = ({part, exercises}) => {
    return (
      <p>
        {part} {exercises}
      </p>
    )
}
  
const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      </div>
    )
}
  
const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}

export default Course
  