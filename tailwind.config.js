/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'sans': ['Poppins', 'sans-serif'],
      },
      colors: {
        'accent-color': '#c4a47c',
      },
    },
  },
  plugins: [],
}