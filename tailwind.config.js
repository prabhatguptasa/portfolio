/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'title': ['clamp(1.75rem, 4vw, 4rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subtitle': ['clamp(1.25rem, 2.5vw, 2rem)', { lineHeight: '1.4' }],
        'body-large': ['clamp(1.125rem, 1.5vw, 1.5rem)', { lineHeight: '1.6' }],
        'body': ['clamp(1rem, 1.2vw, 1.125rem)', { lineHeight: '1.6' }],
        'small': ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.5' }],
        'tiny': ['clamp(0.75rem, 0.9vw, 0.875rem)', { lineHeight: '1.4' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
    },
  },
  plugins: [],
}
