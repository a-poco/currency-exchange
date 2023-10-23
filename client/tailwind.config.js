module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        highlightCustomBlue: '#3da9fc',
        customWhite: '#FFFFFF',
        customPink: '#ef4565',
        customRed: '#C11818',
        customGray: '#B7C6CD',
        customLightGray: '#CFD9DE',
        background: '#fffffe',
        listBackground: '#d8eefe',
        blue: '#094067',
        paragraph: '#5f6c7b',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
