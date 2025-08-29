import ModalWithForm from "../ModalWithForm";
import { useState, useEffect } from "react";
import { isFormComplete } from "../../../utils/checkers";

export default function AddItemModal({ isOpen, onClose, onAddItem }) {
  const [form, setForm] = useState({
    itemName: "",
    itemLink: "",
    itemWeather: "hot",
  });

  useEffect(() => {
    if (isOpen) {
      setForm({
        itemName: "",
        itemLink: "",
        itemWeather: "hot",
      });
    }
  }, [isOpen]);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Check input field
  const checkForm = isFormComplete(form);

  return (
    <ModalWithForm
      isOpen={isOpen}
      closeModal={onClose}
      handleSubmit={() => {
        const { itemName, itemLink, itemWeather } = form;
        onAddItem({
          name: itemName,
          imageUrl: itemLink,
          weather: itemWeather,
        });
      }}
      title="New garment"
    >
      <label htmlFor="itemName" className="modal__label">
        <span className="modal__label_title">Name</span>
        <input
          name="itemName"
          type="text"
          className="modal__input"
          placeholder="Name"
          required
          value={form.itemName}
          onChange={handleChange}
        />
        <span className="modal__error-text post-link-error"></span>
      </label>
      <label htmlFor="itemLink" className="modal__label">
        <span className="modal__label_title">Image</span>
        <input
          name="itemLink"
          type="url"
          className="modal__input"
          placeholder="Image URL"
          minLength="2"
          maxLength="120"
          required
          value={form.itemLink}
          onChange={handleChange}
        />
        <span className="modal__error-text post-caption-error"></span>
      </label>
      <div className="modal__options-container">
        <span className="modal__label_title">Select the weather type:</span>
        <label className="modal__label modal__label_radio">
          <input
            type="radio"
            name="itemWeather"
            value="hot"
            className="modal__radio-input"
            onChange={handleChange}
            checked={form.itemWeather === "hot" ? true : false}
          />
          Hot
        </label>
        <label className="modal__label modal__label_radio">
          <input
            type="radio"
            name="itemWeather"
            value="warm"
            className="modal__radio-input"
            onChange={handleChange}
            checked={form.itemWeather === "warm" ? true : false}
          />
          Warm
        </label>
        <label className="modal__label modal__label_radio">
          <input
            type="radio"
            name="itemWeather"
            value="cold"
            className="modal__radio-input"
            onChange={handleChange}
            checked={form.itemWeather === "cold" ? true : false}
          />
          Cold
        </label>
        <span className="modal__error-text modal__error-text_active post-caption-error"></span>
      </div>
      <button
        type="submit"
        className={`modal__submit-button ${
          checkForm ? "" : "modal__submit-button_disabled"
        }`}
        // disabled
      >
        Add garment
      </button>
    </ModalWithForm>
  );
}
