import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import { isFormComplete } from "../../utils/constants";

export default function LoginModal({ isOpen, onClose, onLogin, onSwitch }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // clear form state
  const initialState = {
    email: "",
    password: "",
  };

  // Timeout for error message
  const showError = (message, duration = 5000) => {
    setError(message);
    if (duration > 0) {
      setTimeout(() => setError(""), duration);
    }
  };

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // check if any required field is empty
  const checkForm = isFormComplete(form);

  const handleSubmit = () => {
    const { email, password } = form;

    setError("");

    onLogin({
      email,
      password,
    })
      .then(() => {
        onClose();
        setForm(initialState);
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

      <div className="register-button__container">
        <button
          type="submit"
          className={`modal__submit-button ${
            checkForm ? "" : "modal__submit-button_disabled"
          }`}
          // disabled
        >
          Log in
        </button>
        <button type="button" className="register__login" onClick={onSwitch}>
          or Sign up
        </button>
      </div>
    </ModalWithForm>
  );
}
