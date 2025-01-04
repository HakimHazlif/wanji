/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        "orange-amber": "#ffbf00",
        "orange-coral": "#ff7f50",
        peach: "#ffe5b4",
        strawberry: "#ff1f1f",
        "blue-paresian": "#192bc2",
        "blue-maya": "#0000ff",
      },
    },
  },
  plugins: [],
};
