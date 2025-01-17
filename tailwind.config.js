/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        mainBackgroundColor: "#ffff",
        columnBackgroundColor: "#161C22",
      },
    },
  },
  plugins: [require("daisyui")],
};
