import './ModalWithForm.css';
import closeIcon from '../../assets/close-icon.svg';
import { Children, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';




export default function ModalWithForm({ children, isOpen, closeModal, handleSubmit, title }) {
    
    return (
        <div className={`modal ${isOpen ? 'modal_open' : ''}`} onClick={closeModal}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                        <h2 className="modal__title">{title}</h2>
                        <button type="button" className="modal__close-button" onClick={closeModal}>
                            <img
                                src={closeIcon}
                                alt="close-button"
                                className="modal__close-button-icon"
                            />
                        </button>
                    </div>
                    <div className="modal__content">
                        <form
                            name="new-garment"
                            className="modal__form"
                            id="new-garment-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            {children}
                        </form>
                    </div>
            </div>
        </div>
    );
}