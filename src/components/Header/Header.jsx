import headerLogo from "../../assets/Logo.svg"
import avatarLink from "../../assets/avatarpicture.avif"
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch"
import { NavLink } from "react-router-dom"
import "./Header.css"
import { useAuth } from "../../contexts/AuthContext"


const avatar = new URL(avatarLink, import.meta.url).href;

const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

export default function Header({ openAddItemModal, openRegisterModal, openLoginModal }) {
  const { isLoggedIn } = useAuth();


  return (
    <header className="header">
      <div className="header__info">
        <NavLink to={"/"}>
          <img src={headerLogo} alt="wtwr logo" />
        </NavLink>
        <p className="header__date">{currentDate}, Columbus</p>
      </div>

      <div className="header__right-side">
        <ToggleSwitch />
        {/* {isLoggedIn ? (
          <div className="header__profile">
            <button type="button" className="header__add-button" onClick={openAddItemModal}>
              + Add clothes
            </button>
            <div className="header__profile-name">Abraham Efraim</div>
            <NavLink to={"/profile"} className="header__profile-link">
              <div className="header__profile-avatar-container">
                <img src={avatar} alt="profile picture" className="header__profile-avatar" />
              </div>
            </NavLink>
          </div>) : ( */}
        <div className="header__profile">
          <button type="button" className="header__add-button" onClick={openRegisterModal}>
              Sign Up
          </button>
          <button type="button" className="header__add-button" onClick={openLoginModal}>
              Log In
          </button>
        </div>
      </div>
    </header>
  )
}