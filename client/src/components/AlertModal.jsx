import React from 'react';
import '../css/AlertModal.css';

const AlertModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal alert-modal">
                <div className="modal-content">
                    <h2>⚠️ NOPE!</h2>
                    <p>{message}</p>
                    <button onClick={onClose} className="modal-close-button">
                        UGH, OK FINE 🙄
                    </button>
                </div>
            </div>
        </>
    );
};

export default AlertModal;
