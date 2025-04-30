import animations from '@midudev/tailwind-animations'

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
    animations,
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
