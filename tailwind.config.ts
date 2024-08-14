import type { Config } from "tailwindcss";
// tailwind.config.js
import { nextui } from "@nextui-org/react";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        dotted: "radial-gradient(circle, #4a5568 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-size": "8px 8px",
      },
      fontFamily: {
        sora: "var(--font-sora)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "alpha-90": "var(--alpha-90)",
        // info colors theme
        "background-primary": "var(--background-primary)",
        "info-50": "var(--info-50)",
        "info-100": "var(--info-100)",
        "info-200": "var(--info-200)",
        "info-300": "var(--info-300)",
        "info-400": "var(--info-400)",
        "info-500": "var(--info-500)",
        "info-600": "var(--info-600)",
        "info-700": "var(--info-700)",
        "info-800": "var(--info-800)",
        "info-900": "var(--info-900)",
        "info-950": "var(--info-950)",
        // brand color theme
        "brand-50": "var(--brand-50)",
        "brand-100": "var(--brand-100)",
        "brand-200": "var(--brand-200)",
        "brand-300": "var(--brand-300)",
        "brand-400": "var(--brand-400)",
        "brand-500": "var(--brand-500)",
        "brand-600": "var(--brand-600)",
        "brand-700": "var(--brand-700)",
        "brand-800": "var(--brand-800)",
        "brand-900": "var(--brand-900)",
        "brand-950": "var(--brand-950)",
        // neutral color theme
        "neutral-50": "var(--neutral-50)",
        "neutral-100": "var(--neutral-100)",
        "neutral-200": "var(--neutral-200)",
        "neutral-300": "var(--neutral-300)",
        "neutral-400": "var(--neutral-400)",
        "neutral-500": "var(--neutral-500)",
        secondary: "var(--secondary)",
        "neutral-700": "var(--neutral-700)",
        "neutral-800": "var(--neutral-800)",
        "neutral-900": "var(--neutral-900)",
        "neutral-950": "var(--neutral-950)",
        // neutral color theme
        "warning-50": "var(--warning-50)",
        "warning-100": "var(--warning-100)",
        "warning-200": "var(--warning-200)",
        "warning-300": "var(--warning-300)",
        "warning-400": "var(--warning-400)",
        "warning-500": "var(--warning-500)",
        "warning-600": "var(--warning-600)",
        "warning-700": "var(--warning-700)",
        "warning-800": "var(--warning-800)",
        "warning-900": "var(--warning-900)",
        "warning-950": "var(--warning-950)",
        // neutral color theme
        "error-50": "var(--error-50)",
        "error-100": "var(--error-100)",
        "error-200": "var(--error-200)",
        "error-300": "var(--error-300)",
        "error-400": "var(--error-400)",
        "error-500": "var(--error-500)",
        "error-600": "var(--error-600)",
        "error-700": "var(--error-700)",
        "error-800": "var(--error-800)",
        "error-900": "var(--error-900)",
        "error-950": "var(--error-950)",

        primary: "var(--primary)",
        "bg-brand-subtle": "var(--bg-brand-subtle)",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.5, 1.5, 0.8, 1)",
        "expo-in": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "expo-out": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      keyframes: {
        skeleton: {
          to: {
            transform: "translateX(100%)",
          },
        },
        tableRow: {
          from: {
            opacity: "0%",
            transform: "translateY(1rem) scaleY(110%)",
          },
          to: {
            opacity: "100%",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        tableRow: "tableRow 0.3s forwards",
        // skeleton: "skeleton 2s infinite",
      },
      borderColor: {
        primary1: {
          DEFAULT: "var(--primary-1)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
} satisfies Config;

export default config;
