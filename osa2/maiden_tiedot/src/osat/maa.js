const Country = ({ country: maa }) => (
  <div>
    <h2>{maa.name.common}</h2>
    <div> Pääkaupunki: <b>{maa.capital}</b> </div>
    <div> Pinta-ala: <b>{maa.area.toLocaleString()} neliökilometriä</b> </div>
    <h2>Kielet:</h2>
    <ul>
      {Object.keys(maa.languages).map((key) => (
        <li key={key}>{maa.languages[key]}</li>
      ))}
    </ul>
    <img
      src = { maa.flags.svg }
      style = {{ maxHeight: 350 }}
      alt = {`${maa.name.common} lippu`}
    />
  </div>
)

export default Country