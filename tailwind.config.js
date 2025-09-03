/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // Custom gradient class
        "custom-gradient": "linear-gradient(to left, #4EE6BB, #068E58)",
        "active-plan-gradient": "linear-gradient(to right, #53AE94, #4EE6BB)"
      },
      backgroundColor: {
        primary: "#03002F",
        "button-color": "#ED0057",
      },
      boxShadow: {
        "custom-drop": "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        'primary-green': '#006C3F'
      }
    },
  },
  plugins: [],
};
