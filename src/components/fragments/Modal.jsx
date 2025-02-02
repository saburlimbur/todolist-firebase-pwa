import React from 'react';
import Button from '../elements/Button';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // event overlay
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50" onClick={handleOverlayClick}>
      <div className="bg-white rounded-lg shadow-lg p-5 w-[90%] md:w-[500px]" onClick={handleModalClick}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
