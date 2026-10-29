/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // The printed-book palette shared by the whole site. Clay is the hub's own
      // accent; inside a nation's guide, components reach it only through theme.
      colors: {
        paper: "#F3EADB",
        rule: "#CDBA9C",
        ink: {
          DEFAULT: "#2B1E16",
          deep: "#231A14",
          soft: "#5C4636",
          faint: "#8A735C",
        },
        clay: {
          DEFAULT: "#A2431F",
          dark: "#863517",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        reading: ["Newsreader", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
}
