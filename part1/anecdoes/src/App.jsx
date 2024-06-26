import { useState } from 'react'

const Button = (props) => {
  return(
    <div>
      <h3>{props.value1} has {props.value2} vote(s)</h3>
      <button onClick={props.onText2Click}>
        {props.text2}
      </button>
      <button onClick={props.onText1Click}>
        {props.text1}
      </button>

      <h3>Anecdote with most votes</h3>
      {props.anecdotes[props.maxVotes]}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
      Array(anecdotes.length).fill(0)
  )

  const getRandomInt = (max) => {
    return Math.floor(Math.random()*max)
  }

  const getMaxVotes = () => {
    const copy = Object.values(votes)
    return copy.indexOf(Math.max.apply(Math, copy))
  }

  

  const handleAnecdoteClick = () => {
    const index = getRandomInt(anecdotes.length)
    setSelected(index)
  }

  const handleVoteClick = () => {
    const copy = {...votes}
    copy[selected]+=1
    setVotes(copy)
  }
   

  return (
    <div>
      <Button text1="next anecdote" value1={anecdotes[selected]} onText1Click={handleAnecdoteClick} text2="vote" value2={votes[selected]} onText2Click={handleVoteClick} anecdotes={anecdotes} maxVotes={getMaxVotes()}/>
    </div>
  )
}

export default App