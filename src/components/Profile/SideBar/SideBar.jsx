import "./Sidebar.css";
import { useAuth } from "../../../contexts/AuthContext";

export default function SideBar({ updateProfile, logOutModal }) {
  const { currentUser } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="header__profile-avatar-container">
          <img
            src={currentUser.avatar}
            alt="profile picture"
            className="header__profile-avatar"
          />
        </div>
        <h1 className="sidebar__name">{currentUser.name}</h1>
      </div>
      <div className="sidebar__info">
        <button
          type="button"
          className="sidebar__button"
          onClick={updateProfile}
        >
          Change profile data
        </button>
        <button type="button" className="sidebar__button" onClick={logOutModal}>
          Log out
        </button>
      </div>
    </div>
  );
}
