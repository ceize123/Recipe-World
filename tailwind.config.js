/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#BC6431',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.bold'),
        },
        h2: {
          fontSize: theme('fontSize.2xl'),
          fontWeight: theme('fontWeight.bold'),
        },
        h3: { fontSize: theme('fontSize.xl') },
        p: { fontSize: theme('fontSize.lg') },
        th: { fontSize: theme('fontSize.lg') },
        td: { fontSize: theme('fontSize.lg') },
      })
    }),
  ],
}
