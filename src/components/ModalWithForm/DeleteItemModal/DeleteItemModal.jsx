import './DeleteItemModal.css';
import closeIcon from "../../../assets/close-icon.svg";

export default function DeleteItemModal({ isOpen, closeModal, onDelete, item }) {
    return (
        <div className={`modal ${isOpen ? 'modal_open' : ''}`} onClick={closeModal}>
            <div className="delete-item-modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <button type="button" className="modal__close-button delete-item-modal__close-button" onClick={closeModal}>
                        <img
                            src={closeIcon}
                            alt="close-button"
                            className="modal__close-button-icon"
                        />
                    </button>
                </div>
                <div className="delete-item-modal__content">
                    <p className='delete-item-modal__text'>Are you sure you want to delete this item?</p>
                    <p className="delete-item-modal__text">This action is irreversible.</p>
                    <div className="button-container">
                        <button className="delete-item-modal__button confirm-button" onClick={onDelete}>
                            Yes, delete item
                        </button>
                        <button className="delete-item-modal__button cancel-button" onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}