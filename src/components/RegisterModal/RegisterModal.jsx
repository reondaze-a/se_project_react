import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "./RegisterModal.css";
import "../ModalWithForm/ModalWithForm.css";
import { isFormComplete } from "../../utils/constants";

export default function RegisterModal({ isOpen, onClose, onRegister }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  // Clear form state
  const initialState = {
    email: "",
    password: "",
    name: "",
    avatar: "",
  };

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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // check for input
  const checkForm = isFormComplete(form);

  const handleSubmit = () => {
    const { name, email, avatar, password } = form;

    setError("");
    onRegister({
      name,
      email,
      avatar,
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
      title="Sign up"
    >
      <label htmlFor="email" className="modal__label">
        <span className="modal__label_title">Email*</span>
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <span className="modal__error-text"></span>
      </label>
      <label htmlFor="password" className="modal__label">
        <span className="modal__label_title">Password*</span>
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
      <label htmlFor="name" className="modal__label">
        <span className="modal__label_title">Name*</span>
        <input
          name="name"
          type="text"
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
          name="avatar"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          minLength="2"
          maxLength="120"
          required
          value={form.avatar}
          onChange={handleChange}
        />
        <span className="modal__error-text"></span>
      </label>

      {/*Error message in case registering fails*/}
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
          Next
        </button>
        <p className="register__text">or</p>
        <button type="button" className="register__redirect">
          Log in
        </button>
      </div>
    </ModalWithForm>
  );
}
