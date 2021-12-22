const ThemeReducer = (prevTheme, { type, payload }) => {
  switch (type) {
    case 'TOGGLE_THEME':
      if (payload) {
        return payload.theme;
      }
      return prevTheme === 'light' ? 'dark' : 'light';

    default:
      return prevTheme;
  }
};
export default ThemeReducer;
