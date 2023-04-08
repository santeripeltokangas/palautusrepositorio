const Filter = ({ value, onChange }) => (
    <div>
      Suodata nimen perusteella: <input value={value} onChange={onChange} />
    </div>
  );
  
  export default Filter;