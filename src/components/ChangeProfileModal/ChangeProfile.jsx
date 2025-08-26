import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";

export default function ChangeProfileModal({ isOpen, onClose, onChangeProfile }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
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

    onChangeProfile({
      name,
      avatar,
    })
      .then(() => {
        onClose();
        setName("");
        setAvatar("");
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
      title="Change profile data"
    >
      <label htmlFor="name" className="modal__label">
        <span className="modal__label_title">Name*</span>
        <input
          id="name"
          type="name"
          className="modal__input"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="modal__error-text"></span>
      </label>
      <label htmlFor="avatar-url" className="modal__label">
        <span className="modal__label_title">Avatar</span>
        <input
          id="avatar-url"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <span className="modal__error-text"></span>
      </label>

      {/*Error message in case login fails*/}
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
        Save changes
      </button>
    </ModalWithForm>
  );
}
