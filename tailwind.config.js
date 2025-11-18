/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        londrina: ["Londrina Solid", "cursive"],
        badscript: ["Bad Script", "cursive"],
      },
    },
  },
  plugins: [],
}
