import './Sidebar.css';
import avatarLink from "../../../assets/avatarpicture.avif"
import { useAuth } from "../../../contexts/AuthContext";

const avatar = new URL(avatarLink, import.meta.url).href;

export default function SideBar({ updateProfile }) {
  const { currentUser, setIsLoggedIn } = useAuth();

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="header__profile-avatar-container">
            <img src={currentUser.avatar} alt="profile picture" className="header__profile-avatar" />
        </div>
        <h1 className="sidebar__name">{currentUser.name}</h1>
      </div>
      <div className="sidebar__info">
        <button type="button" className="sidebar__button" onClick={updateProfile}>Change profile data</button>
        <button type="button" className="sidebar__button" onClick={logOut}>Log out</button>
      </div>
    </div>
  ); 
}