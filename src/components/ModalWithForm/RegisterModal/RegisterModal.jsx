import ModalWithForm from "../ModalWithForm";
import { useState } from "react";
import "./RegisterModal.css";
import { useFormAndValidation } from "../../../hooks/useFormAndValidation";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSwitch,
}) {
  const { values, handleChange, resetForm, errors, isValid } = useFormAndValidation();

  const [serverError, setServerError] = useState("");

  // Timeout for error message
  const showError = (message, duration = 5000) => {
    setServerError(message);
    if (duration > 0) {
      setTimeout(() => setServerError(""), duration);
    }
  };


  const handleSubmit = () => {
    const { name, email, avatar, password } = values;

    setServerError("");
    onRegister({ name, email, avatar, password })
      .then(() => {
        onClose();
        resetForm(); // clear all values + errors
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
      <label className="modal__label">
        <span className="modal__label_title">Email*</span>
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="modal__error-text">{errors.email}</span>
      </label>
      <label className="modal__label">
        <span className="modal__label_title">Password*</span>
        <input
          name="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="modal__error-text">{errors.password}</span>
      </label>
      <label className="modal__label">
        <span className="modal__label_title">Name*</span>
        <input
          name="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className="modal__error-text">{errors.name}</span>
      </label>
      <label className="modal__label">
        <span className="modal__label_title">Avatar*</span>
        <input
          name="avatar"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          minLength="2"
          maxLength="120"
          required
          value={values.avatar || ""}
          onChange={handleChange}
        />
        <span className="modal__error-text">{errors.avatar}</span>
      </label>

      {/*Error message in case registering fails*/}
      {serverError && (
        <span className="modal__error-text modal__error-text_active">
          {serverError}
        </span>
      )}

      <div className="register-button__container">
        <button
          type="submit"
          className={`modal__submit-button ${
            isValid ? "" : "modal__submit-button_disabled"
          }`}
          // disabled
        >
          Next
        </button>
        <button type="button" className="register__login" onClick={onSwitch}>
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
}
