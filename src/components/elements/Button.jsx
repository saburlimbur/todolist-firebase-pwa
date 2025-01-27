import React from 'react';

function Button(props) {
  const { 
        type, 
        className, 
        children, 
        onClick, 
        to, 
        disabled 
        } = props;

  return (
    <button 
        to={to} 
        className={className} 
        type={type} 
        onClick={onClick} 
        disabled={disabled}
        >
        {children}
    </button>
  );
}

export default Button;
