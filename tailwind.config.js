/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "#ffffff",
        secondary: "#cbd5e1",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}; 