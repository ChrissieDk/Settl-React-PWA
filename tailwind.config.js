/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      xs: [
        "0.75rem",
        {
          lineHeight: "1rem",
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "1.5rem",
        },
      ],
      base: [
        "1rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      lg: [
        "1.125rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      xl: [
        "1.25rem",
        {
          lineHeight: "2rem",
        },
      ],
      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
        },
      ],
      "3xl": [
        "2rem",
        {
          lineHeight: "2.5rem",
        },
      ],
      "4xl": [
        "2.5rem",
        {
          lineHeight: "3.5rem",
        },
      ],
      "5xl": [
        "3rem",
        {
          lineHeight: "3.5rem",
        },
      ],
      "6xl": [
        "3.75rem",
        {
          lineHeight: "1",
        },
      ],
      "7xl": [
        "4.5rem",
        {
          lineHeight: "1.1",
        },
      ],
      "8xl": [
        "6rem",
        {
          lineHeight: "1",
        },
      ],
      "9xl": [
        "8rem",
        {
          lineHeight: "1",
        },
      ],
      "10xl": [
        "8.5rem",
        {
          lineHeight: "1",
        },
      ],
      "11xl": [
        "9rem",
        {
          lineHeight: "1",
        },
      ],
      "12xl": [
        "9.5rem",
        {
          lineHeight: "1",
        },
      ],
      "13xl": [
        "10rem",
        {
          lineHeight: "1",
        },
      ],
      "14xl": [
        "11rem",
        {
          lineHeight: "1",
        },
      ],
      "15xl": [
        "12rem",
        {
          lineHeight: "1",
        },
      ],
      "16xl": [
        "13rem",
        {
          lineHeight: "1",
        },
      ],
      "17xl": [
        "14rem",
        {
          lineHeight: "1",
        },
      ],
      "18xl": [
        "15rem",
        {
          lineHeight: "1",
        },
      ],
    },
    extend: {
      fontSize: {
        "custom-icon-large": "100px",
        "custom-icon-small": "80px",
      },
      fontFamily: {
        header: ["header", "sans-serif"],
        navbar: ["navbar", "sans-serif"],
        paragraph: ["paragraph", "sans-serif"],
        button: ["button", "sans-serif"],
      },

      colors: {
        black: "#141520",
        white: "#f5f5f5",
        orange: {
          50: "#FEF0EC",
          100: "#FDE4DE",
          200: "#FAC6B7",
          300: "#F8AB96",
          400: "#FCB120",
          500: "#F3734E",
          600: "#EF4010",
          700: "#B5310C",
          800: "#772008",
          900: "#3E1104",
        },
        green: {
          50: "#F8FBFC",
          100: "#F2F7F8",
          200: "#E1EDEF",
          300: "#D3E5E8",
          400: "#C6DDE2",
          500: "#B7D4DA",
          600: "#82B5BF",
          700: "#51919E",
          800: "#366068",
          900: "#1C3236",
        },
        blue: {
          500: "#1181A1",
        },
      },
    },
    plugins: [],
  },
});
