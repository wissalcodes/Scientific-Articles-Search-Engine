/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: "merryweather",
        merryweather: "lora",
      },
      keyframes: {
        // animation timeline for the GDG Algiers text, for large screens
        slideFromRight: {
          "0%": {
            transform: "translate(50vw,0)",
            opacity: "0",
          },
          "70%": {
            transform: "translate(0,0)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translate(0,0)",
            opacity: "1",
          },
        },
        // animation timeline for the GDG Algiers text, for large screens
        slideFromLeft: {
          "0%": {
            transform: "translate(-50vw,0)",
            opacity: "0",
          },
          "70%": {
            transform: "translate(0,0)",
            opacity: "0.5",
          },
          "100%": {
            transform: "translate(0,0)",
            opacity: "1",
          },
        },
      },
      animation: {
        slideToLeft: "slideFromRight 3s forwards",
        slideToRight: "slideFromLeft 3s forwards",
      },
    },
  },
  plugins: [],
};
