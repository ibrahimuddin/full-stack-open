import { useState } from 'react'

const Title = ({title}) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
      <button onClick={onClick}>
        {text}
      </button>
  )
}

const Statistics = ({text,amount}) => {
  return (
    <div>
      <p>{text} {amount}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good +1
    setGood(updatedGood)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral +1
    setNeutral(updatedNeutral)
  }
  const handleBadClick = () => {
    const updatedBad = bad +1
    setBad(updatedBad)
  }

  return (
    <div>
      <Title title="give feedback" />
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad"  onClick={handleBadClick}/>
      <Title title="statistics" />
      <Statistics text="good" amount={good} />
      <Statistics text="neutral" amount={neutral} />
      <Statistics text="bad" amount={bad} />
    </div>
  )
}

export default App