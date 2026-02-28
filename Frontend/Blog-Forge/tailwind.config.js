/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          50: "#f5f0e8",
          100: "#e8dfc8",
          200: "#d4c49a",
          300: "#bfa26a",
          400: "#a8823e",
          500: "#8c6a28",
          600: "#6e521e",
          700: "#4f3a14",
          800: "#30220a",
          900: "#110c02",
        },
        paper: {
          50: "#fdfbf7",
          100: "#f7f2e8",
          200: "#ede4d0",
          300: "#dfd2b5",
          400: "#ccba92",
        },
        charcoal: {
          800: "#1a1a1a",
          900: "#0d0d0d",
          950: "#080808",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(16px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
