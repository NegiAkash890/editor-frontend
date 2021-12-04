import { createContext, useContext, useEffect, useReducer } from "react";
import ThemeReducer from "../reducer/ThemeReducer";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useReducer(ThemeReducer, "light");

  useEffect(() => {
    const currTheme = localStorage.getItem("theme");
    if (currTheme) {
      setTheme({ type: "TOGGLE_THEME", payload: { theme: currTheme } });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);