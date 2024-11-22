/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./{auth,post,profile}/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
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
    },
  },
  plugins: [],
};
