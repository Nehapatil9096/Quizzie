// Modal.js
import React from 'react';
import './Modal.css'; // Import your modal styling

function Modal({ isOpen, onClose, children }) {
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : 'closed'}`}>
      <div className="modal">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
