const App = () => {
  const course = {
  name: 'Half Stack application development',
  parts: [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
  ]
}

  return (
    <div>
      <Header title = {course.name} />
      <Content k1 = {course.parts[0].name} p1 = {course.parts[0].exercises} k2 = {course.parts[1].name} p2 = {course.parts[1].exercises} k3 = {course.parts[2].name} p3 = {course.parts[2].exercises} />
      <Total lm1 = {course.parts[0].exercises} lm2 = {course.parts[1].exercises} lm3 = {course.parts[2].exercises} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part nimi = {props.k1} kesto = {props.p1} />
      <Part nimi = {props.k2} kesto = {props.p2} />
      <Part nimi = {props.k3} kesto = {props.p3} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.nimi} {props.kesto}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Kursseja on yhteensä {props.lm1 + props.lm2 + props.lm3}</p>
    </div>
  )
}

export default App