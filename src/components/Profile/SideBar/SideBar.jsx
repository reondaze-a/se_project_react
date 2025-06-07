import './SideBar.css';
import avatarLink from "../../../assets/avatarpicture.avif"

const avatar = new URL(avatarLink, import.meta.url).href;

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="header__profile-avatar-container">
            <img src={avatar} alt="profile picture" className="header__profile-avatar" />
        </div>
        <h1 className="sidebar__name">Abraham Efraim</h1>
      </div>
    </div>
  );
}