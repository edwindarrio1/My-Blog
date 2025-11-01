/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ Enables dark mode via 'class'
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#6366f1", // indigo-500
          DEFAULT: "#4f46e5", // indigo-600
          dark: "#3730a3", // indigo-800
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.5)", // soft glow for cards/buttons
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
      },
    },
  },
  plugins: [],
};
