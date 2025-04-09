/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'winky': ['Winky', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "corporate",
      "synthwave",
      "forest",
      "dracula",
      "autumn",
    ],
  },
}
