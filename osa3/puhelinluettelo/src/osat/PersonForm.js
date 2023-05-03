const PersonForm = ({
    onSubmit,
    onChangeNumber,
    valueName,
    valueNumber,
    onChangeName,
    
  }) =>
  (
    <form onSubmit={onSubmit}>
      <div> Nimi: <input value={valueName} onChange={onChangeName} /> </div>
      <div> Numero: <input type="tel" value={valueNumber} onChange={onChangeNumber} /> </div>
      <div> <button type="submit">Lisää</button> </div>
    </form>
  )
  
  export default PersonForm