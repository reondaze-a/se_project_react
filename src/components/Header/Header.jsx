import headerLogo from "../../assets/Logo.svg"
import avatar from "../../assets/Avatar.png"
import "./Header.css"
import { useState, useEffect } from 'react'
import weatherApi from '../../utils/Api'

const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

export default function Header() {
  return (
    <header className="header">
      <div className="header__info">
        <img src={headerLogo} alt="wtwr logo" />
        <p className="header__date">{currentDate}, Columbus</p>
      </div>
      <div className="header__profile">
        <button className="header__add-button">
          + Add clothes
        </button>
        <div className="header__profile-name">Abraham Efraim</div>
        <img src={avatar} alt="profile picture" className="header__profile-avatar" />
      </div>
    </header>
  )
}