/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
   theme: {
      extend: {
         colors: {
            black: '#090909',
            white: '#D3FFE9',
            tertiary: '#4B5043',
            secondary: '#9BC4BC',
            primary: '#8DDBE0'
         }
      }
   },
   plugins: []
}
