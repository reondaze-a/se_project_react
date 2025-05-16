import './ModalWithForm.css';
import closeIcon from '../../assets/close-icon.svg';




export default function ModalWithForm({ isOpen, closeModal }) {

    return (
        <div className={`modal ${isOpen ? 'modal_open' : ''}`} onClick={closeModal}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                        <h2 className="modal__title">New garment</h2>
                        <button type="button" className="modal__close-button">
                            <img
                                src={closeIcon}
                                alt="close-button"
                                className="modal__close-button-icon"
                                onClick={closeModal}
                            />
                        </button>
                    </div>
                    <div className="modal__content">
                        <form
                            name="new-garment"
                            className="modal__form"
                            id="new-garment-form"
                        >
                            <label htmlFor="garment-name" className="modal__label">
                                <span className="modal__label_title">Name</span>
                                <input
                                    id="garment-name"
                                    type="text"
                                    className="modal__input"
                                    placeholder="Name"
                                    required
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
                                    maxLength="30"
                                    required
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
                                        defaultChecked
                                    />
                                    Hot
                                </label>
                                <label className="modal__label modal__label_radio">
                                    <input
                                        type="radio"
                                        name="weather"
                                        value="warm"
                                        className="modal__radio-input"
                                    />
                                    Warm
                                </label>
                                <label className="modal__label modal__label_radio">
                                    <input
                                        type="radio"
                                        name="weather"
                                        value="cold"
                                        className="modal__radio-input"
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
                                disabled
                            >
                                Add garment
                            </button>
                        </form>
                    </div>
            </div>
        </div>
    );
}