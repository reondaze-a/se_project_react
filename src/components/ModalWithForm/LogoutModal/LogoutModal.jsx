import closeIcon from "../../../assets/close-icon.svg";
import { useAuth } from "../../../contexts/CurrentUserContext";

export default function LogoutModal({ isOpen, closeModal }) {
  const { setCurrentUser, setIsLoggedIn } = useAuth();

  const logOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("jwt");
  };

  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`} onClick={closeModal}>
      <div
        className="delete-item-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <button
            type="button"
            className="modal__close-button delete-item-modal__close-button"
            onClick={closeModal}
          >
            <img
              src={closeIcon}
              alt="close-button"
              className="modal__close-button-icon"
            />
          </button>
        </div>
        <div className="delete-item-modal__content">
          <p className="delete-item-modal__text">
            Are you sure you want to log out?
          </p>
          <div className="button-container">
            <button
              className="delete-item-modal__button confirm-button"
              onClick={() => {
                logOut();
                closeModal();
              }}
            >
              Yes
            </button>
            <button
              className="delete-item-modal__button cancel-button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
