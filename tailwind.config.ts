import type { Config } from "tailwindcss";

/**
 * Pharmiq design system.
 *
 * Dark, clinical and quiet: an ink-green surface, one mint signal colour, and
 * warm amber reserved for the two things a pharmacy actually panics about
 * (expiry and stock-out). The glass surfaces are inherited from the Oga Plug
 * system; the palette and type are Pharmiq's own.
 */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#040a08",
          900: "#060f0c",
          850: "#081512",
          800: "#0b1b17",
          750: "#0e221c",
          700: "#122a23",
          600: "#1a3a30",
        },
        mint: {
          200: "#d3fbe8",
          300: "#a9f5d2",
          400: "#71ecb5",
          500: "#3ddc97",
          600: "#16b87a",
          700: "#0d8f60",
        },
        teal: {
          300: "#7ff0e2",
          400: "#3ddbd0",
          500: "#14b8a8",
        },
        bone: "#eaf5f0",
        fog: {
          DEFAULT: "#93aaa2",
          dim: "#6d857d",
          faint: "#4d635c",
        },
        amber: {
          DEFAULT: "#f7b955",
          soft: "#ffd79a",
        },
        rose: {
          DEFAULT: "#fb7185",
          soft: "#fecdd3",
        },
        violet: "#a78bfa",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        glass: "0 24px 60px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
        mint: "0 18px 50px -18px rgba(61,220,151,0.35)",
        panel: "0 40px 120px -40px rgba(0,0,0,0.95)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(40px,-60px,0) scale(1.06)" },
          "66%": { transform: "translate3d(-30px,50px,0) scale(0.96)" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(61,220,151,0.4)" },
          "100%": { boxShadow: "0 0 0 16px rgba(61,220,151,0)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 7s ease-in-out infinite",
        drift: "drift 26s ease-in-out infinite",
        "pulse-ring": "pulseRing 2s ease-out infinite",
        shimmer: "shimmer 6s linear infinite",
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
