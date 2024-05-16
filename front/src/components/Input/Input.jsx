import "./input.scss";

const Input = ({ id, type, label, value, required, onChange, name, error }) => {

  const handleChange = (e) => {

    onChange(e.target.value);

  };

  return (

    <div className="input__container">
  
      <label className="input__label" htmlFor={id}>
  
        {label || "Input label"}
  
      </label>
  
      <input
  
        id={id}
        name={name}
        className={`input ${error ? 'input--error' : ''}`}
        value={value || ""}
        required={required}
        type={type || "text"}
        onChange={handleChange}
  
      />
  
      {error && <span className="input__error">{error}</span>}
  
    </div>

  );
};

export default Input;
