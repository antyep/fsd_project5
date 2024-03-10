import "./CustomInput.css";

export const CustomInput = ({
  placeholder,
  type,
  name,
  handler,
  label,
  value,
  readOnly,
}) => {
  return (
    <div className="input-wrapper">
      {label && (
        <div className="input-label-container">
          <label className="input-label-label">{label}</label>
        </div>
      )}
      {readOnly ? (
        <div className="input-readonly-value">{value}</div>
      ) : (
        <input
          className="input-input"
          placeholder={placeholder}
          type={type}
          name={name}
          onChange={(e) => handler(e)}
          value={value}
        />
      )}
    </div>
  );
};
