/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Futuristic Colors
        cyber: {
          blue: '#10B981',
          pink: '#34D399',
          purple: '#059669',
          yellow: '#BBFE52',
          dark: '#06120E',
          glass: 'rgba(6, 18, 14, 0.4)',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-down": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": { opacity: 0.8, filter: "blur(10px)" },
          "50%": { opacity: 1, filter: "blur(20px)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 4s ease-in-out infinite",
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'cyber-gradient': 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
        'neon-border': 'linear-gradient(var(--background), var(--background)) padding-box, linear-gradient(to right, #10B981, #34D399) border-box',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(16, 185, 129, 0.37)',
        'neon': '0 0 15px rgba(16, 185, 129, 0.5)',
        'neumorphic-light': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'neumorphic-dark': '8px 8px 16px #05050f, -8px -8px 16px #0f102d',
      }
    },
  },
  plugins: [],
}
