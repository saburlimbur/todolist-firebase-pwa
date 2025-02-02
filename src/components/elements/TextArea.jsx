import React from 'react';
import Label from './Label';

function TextArea(props) {
  const { name, value, onChange, onBlur, className, title, id, placeholder } = props;
  return (
    <>
      <Label className="block mb-2 text-xs font-semibold text-[#111827]">{title}</Label>
      <textarea name={name} value={value} onChange={onChange} onBlur={onBlur} className={className} id={id} placeholder={placeholder}></textarea>
    </>
  );
}

export default TextArea;
