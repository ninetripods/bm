/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Noto Serif SC"', "serif"],
        sans: ["Manrope", '"Noto Sans SC"', "system-ui", "sans-serif"],
        cn: ['"Noto Serif SC"', "serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        sage: {
          50: "#F2F5F2",
          100: "#E1E8E2",
          200: "#C2D0C4",
          300: "#A2B6A5",
          400: "#839A86",
          500: "#6C816F",
          600: "#566857",
          700: "#414F42",
        },
        terracotta: {
          300: "#E8B8A6",
          400: "#D89F88",
          500: "#D08B76",
          600: "#B6735F",
        },
        cream: {
          50: "#FDFBF7",
          100: "#F9F5EC",
          200: "#F6F3EB",
          300: "#E8E3D9",
          400: "#E4D5C7",
        },
        ink: {
          900: "#2D362E",
          700: "#5C675D",
        },
      },
      boxShadow: {
        soft: "0 8px 32px rgba(131,154,134,0.10)",
        softer: "0 4px 18px rgba(45,54,46,0.06)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fadeUp 0.7s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
