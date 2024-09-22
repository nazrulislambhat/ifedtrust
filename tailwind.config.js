/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#163c45',
        secondary: '#8cb89f',
        third: '#b4e33d',
        black: '#0D1821',
        red: '#FC5130',
        white: '#F9F9F9',
      },
    },
  },
  plugins: [],
}
