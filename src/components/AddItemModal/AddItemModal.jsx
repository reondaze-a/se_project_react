import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";



export default function AddItemModal({ isOpen, onClose, onAddItem }) {
    const [itemName, setItemName] = useState('');
    const [itemLink, setItemLink] = useState('');
    const [itemWeather, setItemWeather] = useState("hot");

    useEffect(() => {
        if (isOpen) {
            setItemName('');
            setItemLink('');
            setItemWeather("hot");
        }
    }, [isOpen]);

    return (
        <ModalWithForm 
            isOpen={isOpen} 
            closeModal={onClose} 
            handleSubmit={() => onAddItem(
                {
                    id: uuidv4(),
                    name: itemName,
                    link: itemLink,
                    weather: itemWeather
                }
            )} 
            title="New garment">
            <label htmlFor="garment-name" className="modal__label">
                <span className="modal__label_title">Name</span>
                <input
                    id="garment-name"
                    type="text"
                    className="modal__input"
                    placeholder="Name"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <span
                    className="modal__error-text post-link-error"
                ></span>
            </label>
            <label htmlFor="garment-url" className="modal__label">
                <span className="modal__label_title">Image</span>
                <input
                    id="garment-url"
                    type="url"
                    className="modal__input"
                    placeholder="Image URL"
                    minLength="2"
                    maxLength="120"
                    required
                    value={itemLink}
                    onChange={(e) => setItemLink(e.target.value)}
                />
                <span
                    className="modal__error-text post-caption-error"
                ></span>
            </label>
            <div className="modal__options-container">
                <span className="modal__label_title">Select the weather type:</span>
                <label className="modal__label modal__label_radio">
                    <input
                        type="radio"
                        name="weather"
                        value="hot"
                        className="modal__radio-input"
                        onChange={(e) => setItemWeather(e.target.value)}
                        checked={itemWeather === "hot" ? true : false}
                    />
                    Hot
                </label>
                <label className="modal__label modal__label_radio">
                    <input
                        type="radio"
                        name="weather"
                        value="warm"
                        className="modal__radio-input"
                        onChange={(e) => setItemWeather(e.target.value)}
                        checked={itemWeather === "warm" ? true : false}
                    />
                    Warm
                </label>
                <label className="modal__label modal__label_radio">
                    <input
                        type="radio"
                        name="weather"
                        value="cold"
                        className="modal__radio-input"
                        onChange={(e) => setItemWeather(e.target.value)}
                        checked={itemWeather === "cold" ? true : false}
                    />
                    Cold
                </label>
                <span
                    className="modal__error-text post-caption-error"
                ></span>
            </div>
            <button
                type="submit"
                className="modal__submit-button"
                // disabled
            >
                Add garment
            </button>
        </ModalWithForm>
    );
}