import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/Providers/Themeprovider';
import styles from './index.module.css';

const ThemeIcon = ({ theme }) => (theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />);

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme({ type: 'TOGGLE_THEME' });
  return (
    <button
      type="button"
      className={styles['toggler-btn']}
      onClick={toggleTheme}
    >
      <ThemeIcon theme={theme} />
    </button>
  );
};

ThemeIcon.propTypes = {
  theme: PropTypes.string.isRequired,
};
export default ThemeToggler;
