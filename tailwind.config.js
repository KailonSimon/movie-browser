/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["luxury"],
  },
  plugins: [
    require("daisyui"),
    plugin(({ addVariant }) => {
      addVariant("data-selected", "&[data-selected]");
      addVariant("data-active", "&[data-active]");
      addVariant("data-hovered", "&[data-hovered]");
      addVariant("data-in-range", "&[data-in-range]");
      addVariant("data-first-in-range", "&[data-first-in-range]");
      addVariant("data-last-in-range", "&[data-last-in-range]");
      addVariant("data-dots", "&[data-dots]");
      addVariant("data-checked", "&[data-checked]");
    }),
  ],
};
