import React from "react";
import "./InputField.css";

const InputField = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input type={type} value={value} onChange={onChange} className="input-field" placeholder={placeholder} />
    </div>
  );
};

export default InputField;
