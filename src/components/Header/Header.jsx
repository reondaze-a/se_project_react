import headerLogo from "../../assets/Logo.svg"
import "./Header.css"

const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

export default function Header() {
  return (
    <header className="header">
      <div className="header__info">
        <img src={headerLogo} alt="wtwr logo" />
        <div className="header__date">{currentDate}, Columbus</div>
      </div>
      <div className="header__profile">
        <button className="header__add-button">
          + Add clothes
        </button>
        <div className="header__profile-name">John Doe</div>
        <img src="https://via.placeholder.com/40" alt="profile" className="header__profile-avatar" />
      </div>
    </header>
  )
}