import React, {
  createContext, useContext, useEffect, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import ThemeReducer from '../ThemeReducer';

const ThemeContext = createContext();
// eslint disable-next-line
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
    // eslint disable-next-line jsx-no-constructed-context-values
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
