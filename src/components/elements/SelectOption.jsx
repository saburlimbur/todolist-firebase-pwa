import React from 'react';
import Label from './Label';

function SelectOption(props) {
  const { name, value, onChange, onBlur, className, label, title, options, children, id } = props;
  return (
    <>
      <Label className="block mb-2 text-xs font-semibold text-[#111827]">{title}</Label>
      <select 
        name={name} 
        value={value} 
        onChange={onChange} 
        onBlur={onBlur} 
        className={className}
        id={id}
        >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className='text-xs'>
            {option.label}
          </option>
        ))}
        {children}
      </select>
    </>
  );
}

export default SelectOption;
