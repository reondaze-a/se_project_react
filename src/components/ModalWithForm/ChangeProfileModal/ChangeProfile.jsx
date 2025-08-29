import ModalWithForm from "../ModalWithForm";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/CurrentuserContext";
import { isFormComplete } from "../../../utils/checkers";

export default function ChangeProfileModal({
  isOpen,
  onClose,
  onChangeProfile,
}) {
  const { currentUser, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    avatar: "",
  });

  // Rendering of name and avatar link values on open
  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen]); // Reverts back to original values on opening the modal

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

  // check if any required field is empty
  const checkForm = isFormComplete(form);

  // Submit logic
  const handleSubmit = () => {
    const { name, avatar } = form;
    setError("");

    onChangeProfile({
      name,
      avatar,
    })
      .then(() => {
        onClose();
        setForm({
          name,
          avatar,
        });
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <span className="modal__label_title">Avatar</span>
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
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
        className={`modal__submit-button ${
          checkForm ? "" : "modal__submit-button_disabled"
        }`}
        // disabled
      >
        Save changes
      </button>
    </ModalWithForm>
  );
}
