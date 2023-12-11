const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
      'user-activities': 'repeat(auto-fit, minmax(250px, 1fr))',
    },},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#17aa5a",
          },
          secondary: {
            foreground: "#FFFFFF",
            DEFAULT: "#CC780A",
          }
        },
      },
      dark: {
        colors: {},
      },
    },
  })]
}

