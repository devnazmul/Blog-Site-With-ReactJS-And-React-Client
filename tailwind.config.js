module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor:{
        'textPrimary':'#F59E0B',
      },
      backgroundColor:{
        'bgPrimary':'#F59E0B',
      },
      borderColor:{
        'borderPrimary':'#F59E0B'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
