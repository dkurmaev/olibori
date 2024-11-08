export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },

      colors: {
        primary: "#004AAD", // основной цвет
        secondary: "#F7C331", // вторичный цвет
        dark: "#212121", // цвет для текста
        light: "#FFFFFF", // светлый цвет для фона
      },
      opacity: {
        80: "0.8",
      },
      backdropBlur: {
        md: "10px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 5s ease-out forwards",
      },
      transitionDelay: {
        0: "0ms",
        100: "100ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1000: "1000ms",
      },
    },
  },
  plugins: [],
};