/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'app-black': '#212121',
        white: '#fff',
        giratina: {
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e'
        },
        charizard: {
          100: '#FFF8CF',
          200: '#FEF2A0',
          300: '#FEEB70',
          400: '#FEE440',
          500: '#FFD60A'
        }
      },
      fontFamily: {
        app: ['Poppins', 'Arial', 'sans-serif'],
        'app-light': ['Poppins-Light', 'Arial', 'sans-serif'],
        'app-medium': ['Poppins-Medium', 'Arial', 'sans-serif'],
        'app-semibold': ['Poppins-Semibold', 'Arial', 'sans-serif']
      },
      fontSize: {
        heading1: 32,
        body1: 16,
        body2: 14
      }
    }
  },
  plugins: []
}
