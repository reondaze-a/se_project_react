import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";

export default function ChangeProfileModal({ isOpen, onClose, onChangeProfile }) {
  const [form, setForm] = useState({
    name: "",
    avatar: "",
  });
  const [error, setError] = useState("");

  // Timeout for error message
  const showError = (message, duration = 5000) => {
    setError(message);
    if (duration > 0) {
      setTimeout(() => setError(""), duration);
    }
  };

  // Handles input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // check if any required field is empty
  const isFormComplete = Object.values(form).every((val) => val.trim() !== "");

  const handleSubmit = () => {
    setError("");

    onChangeProfile({
      name: form.name,
      avatar: form.avatar,
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
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <span className="modal__error-text"></span>
      </label>
      <label htmlFor="avatar" className="modal__label">
        <span className="modal__label_title">Avatar*</span>
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          required
          value={form.avatar}
          onChange={handleChange}
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
        className={`modal__submit-button ${isFormComplete ? "" : "modal__submit-button_disabled"}`}
        // disabled
      >
        Save changes
      </button>
    </ModalWithForm>
  );
}
