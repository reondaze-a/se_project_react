import headerLogo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import { fallbackStyle } from "../../utils/constants";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

export default function Header({
  openAddItemModal,
  openRegisterModal,
  openLoginModal,
  locationName,
}) {
  const [imgError, setImgError] = useState(false);
  const { isLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    setImgError(false);
  }, [currentUser?.avatar]); // Reset imgError when avatar URL changes

  return (
    <header className="header">
      <div className="header__info">
        <NavLink to={"/"}>
          <img src={headerLogo} alt="wtwr logo" />
        </NavLink>
        <p className="header__date">
          {currentDate}, {locationName}
        </p>
      </div>

      <div className="header__right-side">
        <ToggleSwitch />
        {isLoggedIn ? (
          <div className="header__profile">
            <button
              type="button"
              className="header__add-button"
              onClick={openAddItemModal}
            >
              + Add clothes
            </button>
            <div className="header__profile-name">{currentUser.name}</div>
            <NavLink
              to={"/profile"}
              className="header__profile-link"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="header__profile-avatar-container">
                {imgError ? (
                  <div style={fallbackStyle}>
                    {currentUser.name[0].toUpperCase()}
                  </div>
                ) : (
                  <img
                    src={currentUser.avatar}
                    alt="profile picture"
                    className="header__profile-avatar"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="header__profile">
            <button
              type="button"
              className="header__add-button"
              onClick={openRegisterModal}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__add-button"
              onClick={openLoginModal}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
