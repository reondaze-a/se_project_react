import headerLogo from "../../assets/Logo.svg"
import avatarLink from "../../assets/avatarpicture.avif"
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch"
import "./Header.css"
import { useState, useEffect } from 'react'
import weatherApi from '../../utils/Api'


const avatar = new URL(avatarLink, import.meta.url).href;

const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

export default function Header({ openModal }) {

  return (
    <header className="header">
      <div className="header__info">
        <img src={headerLogo} alt="wtwr logo" />
        <p className="header__date">{currentDate}, Columbus</p>
      </div>
      <ToggleSwitch
        isChecked={false}
        onChange={() => {
          // Handle toggle switch change
          console.log("Toggle switch changed");
        }}
      />
      <div className="header__profile">
        <button type="button" className="header__add-button" onClick={openModal}>
          + Add clothes
        </button>
        <div className="header__profile-name">Abraham Efraim</div>
        <div className="header__profile-avatar-container">
          <img src={avatar} alt="profile picture" className="header__profile-avatar" />
        </div>
      </div>
    </header>
  )
}