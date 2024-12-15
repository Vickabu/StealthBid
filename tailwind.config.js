/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./{listing,profile}/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        deepTeal: "#102F32",
        softSteel: "#BCC6C8",
        lightGrey: "#E2E4E4",
        pastelAqua: "#C6D7D9",
        freshSage: "#74A37E",
        mutedRose: "#D29090",
        warmSand: "#E3BF9B",
        dustyTan: "#D2AB8A",
        softIvory: "#EAD1BD",
      },
      fontFamily: {
        primary: ["Lato", "san-serif"],
        secondary: ["Playfair", "serif"],
      },
    },
  },
  plugins: [],
};
