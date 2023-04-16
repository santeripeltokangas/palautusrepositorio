const CountryList = ({ countries: maat, onSelectCountry: valittaessa }) =>
  maat.map((maa) => (
    <div key={maa.cca3}>
      {maa.name.common}{' '}
      <button onClick={() => valittaessa(maa.name.common)}>Näytä</button>
    </div>
  ))

export default CountryList