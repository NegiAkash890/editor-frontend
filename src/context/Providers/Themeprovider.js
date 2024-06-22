import React, {
  createContext, useContext, useEffect, useMemo, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import ThemeReducer from '../reducers/ThemeReducer';

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useReducer(ThemeReducer, 'light');
  const themeContentValue = useMemo(() => ({
    theme: themePreference, setTheme: setThemePreference,
  }));

  useEffect(() => {
    const currentActiveTheme = localStorage.getItem('theme');
    if (currentActiveTheme) {
      setThemePreference({ type: 'TOGGLE_THEME', payload: { theme: currentActiveTheme } });
    }
  }, []);

  useEffect(() => localStorage.setItem('theme', themePreference), []);

  return (
    <ThemeContext.Provider value={themeContentValue}>
      {children}
    </ThemeContext.Provider>
  );
};
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useTheme = () => useContext(ThemeContext);
