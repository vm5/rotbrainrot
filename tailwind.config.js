/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#00ff9d',
          DEFAULT: '#00bf8f',
          dark: '#006d4f',
        },
        secondary: {
          light: '#ff71ce',
          DEFAULT: '#ff00ff',
          dark: '#b100b1',
        },
        cyber: {
          neon: '#0ff',
          purple: '#b967ff',
          pink: '#ff71ce',
          green: '#01ffc3',
          yellow: '#fffb96',
          blue: '#45caff',
        },
        matrix: {
          light: '#00ff41',
          DEFAULT: '#008f11',
          dark: '#003b00',
        },
        brain: {
          gray: '#2a2a2a',
          dark: '#1a1a1a',
          light: '#3a3a3a',
          accent: '#ff71ce',
        },
        background: '#0a0a0a',
      },
      fontFamily: {
        cyber: ['Share Tech Mono', 'monospace'],
        glitch: ['Rubik Glitch', 'cursive'],
        code: ['Fira Code', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-5px, 2px)' },
          '66%': { transform: 'translate(5px, -2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-neon': {
          '0%, 100%': { 
            textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa'
          },
          '50%': { 
            textShadow: '0 0 4px #fff, 0 0 7px #fff, 0 0 13px #fff, 0 0 25px #0fa, 0 0 50px #0fa, 0 0 60px #0fa, 0 0 70px #0fa, 0 0 100px #0fa'
          },
        },
      },
    },
  },
  plugins: [],
} 