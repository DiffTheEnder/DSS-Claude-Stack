// Shared Tailwind configuration for all dashboard pages
// Include this script AFTER the Tailwind CDN script tag

tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#F7F4EF",
          100: "#f5f2ed",
          200: "#efe9e0",
          300: "#e8e0d4",
          400: "#E3DDD4",
          white: "#FEFCF9",
        },
        warmgray: {
          100: "#f0ebe3",
          300: "#d4c8b8",
          400: "#9B9183",
          500: "#7D7265",
          600: "#5C5044",
          700: "#4a3c2e",
          900: "#2C2418",
        },
        warmdark: {
          950: "#1A1612",
          900: "#242018",
          800: "#2C2720",
          700: "#3A3530",
          600: "#4a3f32",
        },
        accent: {
          50: "#F2F7F5",
          100: "#E3EEEA",
          200: "#C5D9D4",
          400: "#2DB892",
          500: "#0E9C82",
          600: "#0E7C6B",
          700: "#0B6358",
          800: "#084C44",
          900: "#053B35",
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        syne: ['Syne', 'sans-serif'],
      }
    }
  }
}
