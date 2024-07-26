/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  
  theme: {
    extend: {
      // colors:{ backdrop: rgb(107, 113, 116)}
    },
  },
  plugins: [],
}