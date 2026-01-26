/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mario-red': '#E52521',
        'mario-blue': '#009DDC',
        'mario-yellow': '#FBD000',
        'brick-brown': '#8B4513',
        'sky-blue': '#5C94FC',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 1s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'shake': 'shake 0.5s infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        }
      }
    },
  },
  plugins: [],
}
