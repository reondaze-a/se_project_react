import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
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

    onLogin({
      email: form.email,
      password: form.password,
    })
      .then(() => {
        onClose();
        setEmail("");
        setPassword("");
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
      title="Login"
    >
      <label htmlFor="email" className="modal__label">
        <span className="modal__label_title">Email</span>
        <input
          name="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <span className="modal__error-text"></span>
      </label>
      <label htmlFor="password" className="modal__label">
        <span className="modal__label_title">Password</span>
        <input
          name="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          required
          value={form.password}
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
        Log in
      </button>
    </ModalWithForm>
  );
}
