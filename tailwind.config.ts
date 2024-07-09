import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slide: {
          "0%": {
            transform: "translateY(50%)",
            backgroundColor: "rgba(39, 39, 42, 0.5)",
          },
          "100%": {
            transform: "translateY(0%)",
            backgroundColor: "rgba(39, 39, 42, 1)",
          },
        },
        wiggle: {
          "0%, 25%, 50%, 75%, 100%": {
            transform: "translateX(0%)",
          },
          "12.5%, 62.5": {
            transform: "translateX(-25%)",
          },
          "37.5%, 87.5%": {
            transform: "translateX(25%)",
          },
        },
      },
      animation: {
        slide: "slide 0.5s cubic-bezier(0.4, 0, 0.6, 1)",
        wiggle: "wiggle 0.2s cubic-bezier(0.4, 0, 0.6, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
