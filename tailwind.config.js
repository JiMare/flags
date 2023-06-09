/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: { md: "850px" },
    extend: {
      colors: {
        white: "#fff",
        cream: "F2F2F2",
        black: "#202C36",
        grey: "#2B3844",
        black_text: "#111517",
      },
    },
  },
  plugins: [],
};
