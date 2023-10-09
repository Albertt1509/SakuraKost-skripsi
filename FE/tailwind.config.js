/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e37ba5",
        lens: "#a2a3a2",
      },
    },
  },
  plugins: [],
};
