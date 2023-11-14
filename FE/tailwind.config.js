/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fdf7f7",
        lens: "#f2e9fa",
      },
    },
  },
  plugins: [],
};
