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
          success: {
            foreground: "#FFFFFF",
            DEFAULT: "#09f",
            light: "#e5f8ff"
          },
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#17aa5a"
          },
          secondary: {
            foreground: "#FFFFFF",
            DEFAULT: "#CC780A",
            blurred: "#f2b76f",
          },
          tertiary: {
            foreground: "#FFFFFF",
            DEFAULT: "#9b4ae8",
            blurred: "#dbc1f4",
            dark: "#765793"
          },
          default: {
            light: "#bfbfc1"
          }
        },
      },
      dark: {
        colors: {},
      },
    },
  })]
}

