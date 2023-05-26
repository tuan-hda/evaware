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
          500: '#FFD60A',
          600: '#D6B200'
        },
        gengar: {
          100: '#C5CAE9',
          200: '#9FA8DA',
          300: '#7986CB',
          400: '#5C6BC0',
          500: '#3F51B5'
        },
        magikarp: {
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336'
        },
        venusaur: {
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50'
        }
      },
      fontFamily: {
        app: ['Lexend-Light', 'Arial', 'sans-serif'],
        'app-light': ['Lexend-Light', 'Arial', 'sans-serif'],
        'app-medium': ['Lexend-Medium', 'Arial', 'sans-serif'],
        'app-semibold': ['Lexend-Semibold', 'Arial', 'sans-serif'],
        'app-regular': ['Lexend', 'Arial', 'sans-serif']
      },
      fontSize: {
        heading0: 48,
        heading1: 32,
        heading2: 24,
        body1: 16,
        body2: 14,
        body3: 12
      }
    }
  },
  plugins: []
}
