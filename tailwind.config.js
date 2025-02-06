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
        "transparent-amber": "#ffde05c3",
        "dark-page": "#1c1b21",
        "bluish-black": "#181325",
      },
      animation: {
        zigzag: "zigzag 1s linear",
        write: "write 1.5s linear",
      },
      keyframes: {
        zigzag: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-5px)" },
          "40%": { transform: "translate(2px)" },
          "60%": { transform: "translate(-5px)" },
          "80%": { transform: "translate(2px)" },
          "100%": { transform: "translate(0)" },
        },
        write: {
          "0%": { transform: "translate(0) rotate(0deg)" },
          "20%": { transform: "translate(-2px) rotate(-5deg)" },
          "40%": { transform: "translate(2px) rotate(2deg)" },
          "60%": { transform: "translate(-2px) rotate(-5deg)" },
          "80%": { transform: "translate(2px) rotate(2deg)" },
          "100%": { transform: "translate(0) rotate(0deg)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  variants: {
    scrollbar: ["rounded"],
  },
};
