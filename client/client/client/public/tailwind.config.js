// ========================
// STYLE: tailwind.config.js
// Description: Tailwind CSS configuration
// ========================

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}