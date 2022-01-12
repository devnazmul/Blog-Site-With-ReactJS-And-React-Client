module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor:{
        'textPrimary':'#47A359',
      },
      backgroundColor:{
        'bgPrimary':'#47A359',
      },
      borderColor:{
        'borderPrimary':'#47A359'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
