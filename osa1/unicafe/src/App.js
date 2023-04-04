import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    <h1>Give feedback</h1>
    <Button handleClick = {() => setGood(good + 1)} text = 'Good' />
    <Button handleClick = {() => setNeutral(neutral + 1)} text = 'Neutral' />
    <Button handleClick = {() => setBad(bad + 1)} text = 'Bad' />
    <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

const Statistics = (props) => {
  if (props.good === 0 & props.neutral === 0 & props.bad === 0) {
    return (
      <div>
      <p>No feedback given</p>
      </div>
      )
    }
  return (
    <div>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.bad + props.neutral + props.good} />
      <StatisticLine text="average" value ={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
      <StatisticLine text="positive" value ={(props.good / (props.good + props.neutral + props.bad)) * 100 + '%'} />
    </div>
  )
}

const StatisticLine = (props) => {
  return(
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

export default App