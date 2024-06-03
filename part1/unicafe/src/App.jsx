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
      <tr>
        <td>{text}</td>
        <td>{amount}</td>
      </tr>
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
  if(good===0 && neutral===0 && bad===0){
    return (
      <div>
        <Title title="give feedback" />
        <Button text="good" onClick={handleGoodClick} />
        <Button text="neutral" onClick={handleNeutralClick} />
        <Button text="bad"  onClick={handleBadClick}/>
        <Title title="statistics" />
        no feedback given
      </div>
    )
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
      <Statistics text="all" amount={good+neutral+bad}/>
      <Statistics text="average" amount={((good*1)+(neutral*0)+(bad*-1))/(good+neutral+bad)} />
      <Statistics text="positive" amount={good/(good+neutral+bad)}/>
    </div>
  )
}

export default App