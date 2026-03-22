/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        sidebar: {
          DEFAULT: '#ffffff',
          dark: '#1e1e1e',
        },
        surface: {
          DEFAULT: '#f4f5f7',
          dark: '#272727',
        },
        card: {
          DEFAULT: '#ffffff',
          dark: '#1e1e1e',
        },
        accent: {
          DEFAULT: '#6366f1',
          soft: '#eef2ff',
          'soft-dark': '#1c1f3a',
        },
        muted: {
          DEFAULT: '#6b7280',
          dark: '#8b92a5',
        },
      },
    },
  },
  plugins: [],
}
