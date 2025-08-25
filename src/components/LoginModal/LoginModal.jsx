import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import '../ModalWithForm/ModalWithForm.css';





export default function LoginModal({ isOpen, onClose, onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <ModalWithForm 
            isOpen={isOpen} 
            closeModal={onClose} 
            handleSubmit={() => onLogin(
                {
                    email: email,
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span
                    className="modal__error-text post-link-error"
                ></span>
            </label>
            <label htmlFor="password" className="modal__label">
                <span className="modal__label_title">Password</span>
                <input
                    id="password"
                    type="password"
                    className="modal__input"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span
                    className="modal__error-text post-link-error"
                ></span>
            </label>
            <button
                type="submit"
                className="modal__submit-button"
                // disabled
            >
                Log in
            </button>
        </ModalWithForm>
    );
}