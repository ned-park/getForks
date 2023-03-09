/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`;
};

const textColor = {
  primary: generateColorClass("text-primary"),
  secondary: generateColorClass("text-secondary"),
  tertiary: generateColorClass("text-tertiary"),
  accent: generateColorClass("text-accent"),
};

const backgroundColor = {
  primary: generateColorClass("bg-primary"),
  secondary: generateColorClass("bg-secondary"),
  tertiary: generateColorClass("bg-tertiary"),
};

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      textColor,
      backgroundColor,
    },
  },

  plugins: [],
};
