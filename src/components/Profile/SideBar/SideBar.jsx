import "./Sidebar.css";
import { useAuth } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { fallbackStyle } from "../../../utils/constants";

export default function SideBar({ updateProfile, logOutModal }) {
  const { currentUser } = useAuth();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [currentUser?.avatar]); // Reset imgError when avatar URL changes

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="header__profile-avatar-container">
          {imgError ? (
            <div style={fallbackStyle}>{currentUser.name[0].toUpperCase()}</div>
          ) : (
            <img
              src={currentUser.avatar}
              alt="profile picture"
              className="header__profile-avatar"
              onError={() => setImgError(true)}
            />
          )}
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
