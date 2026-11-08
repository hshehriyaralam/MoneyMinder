const Input = ({ label, onChange, value, type }) => (
  <label className="field auth-field">
    <span>{label}</span>
    <input
      type={type}
      onChange={onChange}
      value={value}
      required
      autoComplete={type === "password" ? "current-password" : type === "email" ? "email" : "name"}
    />
  </label>
);

export default Input;
