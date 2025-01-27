import React, { forwardRef } from 'react';

const Input = forwardRef((props) => {
  const { type, name, id, value, className, placeholder, autoComplete, icons, required, min, max, children, onBlur, onChange } = props;

  return (
    <div>
      {children}
      <input
        icons={icons}
        type={type}
        name={name}
        id={id}
        value={value}
        className={className}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        min={min}
        max={max}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
});

export default Input;