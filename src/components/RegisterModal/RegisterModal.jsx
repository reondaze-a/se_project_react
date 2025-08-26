import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "./RegisterModal.css";
import "../ModalWithForm/ModalWithForm.css";

export default function RegisterModal({ isOpen, onClose, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarLink, setAvatarLink] = useState("");
  const [error, setError] = useState("");

  // Timeout for error message
  const showError = (message, duration = 5000) => {
    setError(message);
    if (duration > 0) {
      setTimeout(() => setError(""), duration);
    }
  };

  const handleSubmit = () => {
    setError("");

    onRegister({
      name,
      email,
      avatar: avatarLink,
      password,
    })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      closeModal={onClose}
      handleSubmit={handleSubmit}
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
        <span className="modal__error-text"></span>
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
        <span className="modal__error-text"></span>
      </label>
      <label htmlFor="name" className="modal__label">
        <span className="modal__label_title">Name</span>
        <input
          id="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="modal__error-text"></span>
      </label>
      <label htmlFor="avatar-url" className="modal__label">
        <span className="modal__label_title">Avatar URL</span>
        <input
          id="avatar-url"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          minLength="2"
          maxLength="120"
          required
          value={avatarLink}
          onChange={(e) => setAvatarLink(e.target.value)}
        />
        <span className="modal__error-text"></span>
      </label>

      {/*Error message in case registering fails*/}
      {error && (
        <span className="modal__error-text modal__error-text_active">
          {error}
        </span>
      )}

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
