/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A5F",
        "primary-light": "#2a4f7f",
        price: "#16A34A",
        bg: "#F8F9FA",
        disabled: "#E5E7EB",
      },
      fontFamily: {
        sans: ["Inter", "Outfit", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
