/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#14b8a6',
          dark: '#0d9488',
          light: '#5eead4',
        },
        secondary: {
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
        },
      },
    },
  },
  plugins: [],
}

