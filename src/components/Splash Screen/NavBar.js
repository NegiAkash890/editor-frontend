import React from 'react';
import PopupText from './Popup';
import ThemeToggler from './ThemeToggler/ThemeToggler';

const NavBar = () => (
  <div className="top__nav">
    <div className="logo__info">
      <img
        src={`${process.env.PUBLIC_URL}/assets/main-logo.png`}
        alt="site logo"
        width="50px"
      />
      <p id="logo__name">Online Compiler</p>
    </div>
    <div className="info__section">
      <ThemeToggler />
      <a href="https://github.com/NegiAkash890/editor-backend">
        <img
          src={`${process.env.PUBLIC_URL}/assets/github.png`}
          title="Go to GitHub Repository"
          alt="GitHub Icon"
        />
      </a>
      <PopupText />
    </div>
  </div>
);

export default NavBar;
