import '../ModalWithForm/ModalWithForm.css'
import './ItemModal.css';
import closeIcon from '../../assets/close-icon.svg';

export default function ItemModal({ isOpen, closeModal, name, link, weather, openDeleteModal }) {
    return (
        <div className={`modal ${isOpen ? 'modal_open' : ''}`} onClick={closeModal}>
            <div className="item-modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <button type="button" className="modal__close-button item-modal__close-button" onClick={closeModal}>
                        <img
                            src={closeIcon}
                            alt="close-button"
                            className="modal__close-button-icon"
                        />
                    </button>
                    <img src={link} alt={name} className="item-modal_image" />
                </div>
                <div className="item-modal__content">
                    <div className="item-modal__text">
                        <h2 className="item-modal__title">{name}</h2>
                        <p className="item-modal__desc">Weather: {weather}</p>
                    </div>
                    <button className="item-modal__delete-button" onClick={openDeleteModal}>
                        Delete item
                    </button>
                </div>
            </div>
        </div>
    );
}