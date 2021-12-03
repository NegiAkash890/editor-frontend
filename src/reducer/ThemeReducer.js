export const ThemeReducer = (prevTheme, { type, payload }) => {
  switch (type) {
    case "TOGGLE_THEME":
      if (payload) {
        return payload.theme;
      } else {
        return prevTheme === "light" ? "dark" : "light";
      }
    default:
      return prevTheme;
  }
};
