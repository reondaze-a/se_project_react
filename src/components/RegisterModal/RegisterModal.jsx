import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import './RegisterModal.css';
import '../ModalWithForm/ModalWithForm.css';





export default function RegisterModal({ isOpen, onClose, onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [avatarLink, setAvatarLink] = useState('');
    const [error, setError] = useState("");

    return (
        <ModalWithForm 
            isOpen={isOpen} 
            closeModal={onClose} 
            handleSubmit={() => onRegister(
                {
                    name: name,
                    email: email,
                    avatar: avatarLink,
                    password: password
                }
            )} 
            title="Sign up"
        >
            <label htmlFor="email" className="modal__label">
                <span className="modal__label_title">Email</span>
                <input
                    id="email"
                    type="email"
                    className="modal__input"
                    placeholder="Email"
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