import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0f",
        mist: "#d9d9e3",
        plasma: "#6d7cff",
        surge: "#ff73e1",
        halo: "#49fbd4",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      backdropBlur: {
        ultra: "32px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(109, 124, 255, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;