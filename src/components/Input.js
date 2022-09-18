const Input = props => {

    const {label, error, name, onChange, type, defaultValue} = props;

    var inputClassName = "form-control";

    inputClassName += type == "file" ? "-file" : "";
    inputClassName += error ? " is-invalid" : "";

    return (
        <div className="form-group">
            <label>{label}</label>
            <input className={inputClassName} type={type ? type : "text"} onChange={onChange}
                   defaultValue={defaultValue} name={name}/>
            <div className="invalid-feedback">{error}</div>
        </div>
    );
};

export default Input;