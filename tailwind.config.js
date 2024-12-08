/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "light", // Default light theme
      "dark",  // Default dark theme
      "cupcake", 
      "business",
      "night",
      "forest",
      "dracula",
      "acid",
      "nord",
      "cyberpunk"// Add more themes as needed
    ],
  }
}