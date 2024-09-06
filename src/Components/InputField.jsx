import React from "react";

const InputField = (props) => {
  const {
    id = "",
    icon = "",
    label = "",
    type = "text",
    placeholder = "",
    value = "",
    onChange = () => {},
    errorMessage = "",
  } = props;

  return (
    <>
      <label
        htmlFor={id}
        className="mb-2 w-full rounded-full border-analista bg-white p-2 flex items-center input"
      >
        {icon && <img src={icon} alt={label} className="w-6 h-6 rounded-full mr-2" />}
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 appearance-none border-none focus:outline-none focus:ring-0 bg-transparent text-gray-700 leading-tight placeholder-analista placeholder-opacity-100 negrita"
        />
      </label>
      {errorMessage && <p className="text-red-500 text-xs italic mb-4 negrita">{errorMessage}</p>}
    </>
  );
};

export default InputField;