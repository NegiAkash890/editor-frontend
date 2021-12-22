import React, {
  createContext, useContext, useEffect, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import ThemeReducer from '../reducers/ThemeReducer';

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useReducer(ThemeReducer, 'light');

  useEffect(() => {
    const currTheme = localStorage.getItem('theme');
    if (currTheme) {
      setTheme({ type: 'TOGGLE_THEME', payload: { theme: currTheme } });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  });

  return (
    /* eslint-disable */
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
    /* eslint-enable */
  );
};
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useTheme = () => useContext(ThemeContext);
