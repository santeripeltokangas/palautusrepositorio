const FormInput = ({ label, value, onChange }) => (
    <label> {label} <input value={value} onChange={onChange}></input> </label>
  )
  
  export default FormInput