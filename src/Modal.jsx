/* eslint-disable no-unused-vars */

import React from 'react';
import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center w-full z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white p-8 rounded-lg w-ful relative z-10">
                {children}
                <button className="absolute top-2 right-2 text-lg" onClick={onClose}>
                    ✕
                </button>
            </div>
        </div>

    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired, // 添加 isOpen 的 PropTypes 驗證
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
