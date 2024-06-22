const themeConfig = {
  light: 'eclipse',
  dark: 'dracula',
};

const defaultConfig = (mode, themePreference, cb) => ({
  lineWrapping: true,
  lint: true,
  mode,
  theme: themeConfig[themePreference],
  lineNumbers: true,
  extraKeys: {
    'Ctrl-Space': (event) => {
      cb(event);
    },
  },
});

export default defaultConfig;
