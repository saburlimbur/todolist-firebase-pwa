import React from 'react';
import Label from '../elements/Label';
import Input from '../elements/Input';

function InputFields({ label, htmlFor, type, name, id, placeholder, autoComplete, value, onBlur, onChange, error }) {
  return (
    <div className="mb-2">
      <Label htmlFor={htmlFor} className="block mb-2 text-xs font-semibold text-[#111827]">
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onBlur={onBlur}
        onChange={onChange}
        className="block w-full py-4 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}

export default InputFields;
