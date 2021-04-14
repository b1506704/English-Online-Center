import {React, useState, useImperativeHandle, forwardRef } from 'react';
import { createPortal } from'react-dom';

import './Modal.css';

const modalElement = document.getElementById("modal_root");

const Modal = ({children , defaultOpen = false}, ref) => {
    const [title, setTitle] = useState('');
    const [isOpen, setIsOpen] = useState(defaultOpen);

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }), [close]);

    return createPortal(
        isOpen ? 
        <div className="modal">
            {children}
        </div> : null, 
        modalElement
    );
}

export default forwardRef(Modal);