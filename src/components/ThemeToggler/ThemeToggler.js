import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../reducer/context/Themeprovider';
import togglerStyles from './Themetoggler.module.css';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className={`${togglerStyles['toggler-btn']}`}
      onClick={() => setTheme({ type: 'TOGGLE_THEME' })}
    >
      {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
};

export default ThemeToggler;
