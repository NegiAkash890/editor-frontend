/* eslint-disable */
import React from 'react';
import { useTheme } from '../context/Providers/Themeprovider';
import PopupText from './Popup/index';
import ThemeToggler from './ThemeToggler/index';

const NavBar = () => {
  const { theme } = useTheme();
  return (
    <div className="top__nav dark__nav" style={theme === 'dark' ? { backgroundColor: 'black', color: 'white' } : {}}>
      <div className="logo__info">
        <img
          src={`${process.env.PUBLIC_URL}/assets/main-logo.png`}
          alt="site logo"
          width="50px" style={theme === 'dark' ? { backgroundColor: 'white' } : {}}
        />
        <p id="logo__name">Online Compiler <sup>v2</sup></p>
      </div>
      <div className="info__section">
        <PopupText />
        <ThemeToggler />
      </div>
    </div>
  );
};

export default NavBar;
