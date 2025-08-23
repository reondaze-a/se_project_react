import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import './RegisterModal.css';
import '../ModalWithForm/ModalWithForm.css';



export default function RegisterModal({ isOpen, onClose }) {
    const [itemName, setItemName] = useState('');
    const [avatarLink, setAvatarLink] = useState('');

    return (
        <ModalWithForm 
            isOpen={isOpen} 
            closeModal={onClose} 
            handleSubmit={() => onAddItem(
                {
                    _id: uuidv4(),
                    name: itemName,
                    imageUrl: itemLink,
                    weather: itemWeather,
                    createdAt: Date.now()
                }
            )} 
            title="Sign up"
        >
            <label htmlFor="garment-name" className="modal__label">
                <span className="modal__label_title">Name</span>
                <input
                    id="garment-name"
                    type="text"
                    className="modal__input"
                    placeholder="Name"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <span
                    className="modal__error-text post-link-error"
                ></span>
            </label>
            <label htmlFor="avatar-url" className="modal__label">
                <span className="modal__label_title">Image</span>
                <input
                    id="avatar-url"
                    type="url"
                    className="modal__input"
                    placeholder="Image URL"
                    minLength="2"
                    maxLength="120"
                    required
                    value={itemLink}
                    onChange={(e) => setAvatarLink(e.target.value)}
                />
                <span
                    className="modal__error-text post-caption-error"
                ></span>
            </label>
            <button
                type="submit"
                className="modal__submit-button"
                // disabled
            >
                Next
            </button>
        </ModalWithForm>
    );
}