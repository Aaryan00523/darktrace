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
        dark: {
          950: '#030508',
          900: '#05070B', // Primary background
          850: '#080C13',
          800: '#0A0F17', // Secondary background
          750: '#0C131E',
          700: '#0D141E', // Panels
          650: '#111A28',
          600: '#162235', // Borders
          500: '#1D2D44',
          400: '#2A3F5E',
        },
        cyan: {
          DEFAULT: '#00F0FF',
          glow: 'rgba(0, 240, 255, 0.4)',
          dim: 'rgba(0, 240, 255, 0.1)',
        },
        accent: {
          cyan: '#00F0FF',
          blue: '#0284C7',
          purple: '#A855F7',
          amber: '#F59E0B',
          red: '#EF4444',
          green: '#10B981',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(0, 240, 255, 0.25)',
        'glow-cyan-lg': '0 0 35px -5px rgba(0, 240, 255, 0.35)',
        'glow-purple': '0 0 20px -3px rgba(168, 85, 247, 0.25)',
        'glow-red': '0 0 20px -3px rgba(239, 68, 68, 0.25)',
        'glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05), 0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
