const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--palette-primary-main)',
      },
    },
    fontFamily: {
      sans: ['Manrope', ...fontFamily.sans],
      heading: ['IBM Plex Sans', ...fontFamily.sans],
      mono: ['JetBrains Mono', ...fontFamily.mono],
      georama: ['Manrope', ...fontFamily.sans],
    },
  },
  plugins: [require("tailwindcss-animate")],
}
