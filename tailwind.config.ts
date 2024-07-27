/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/common/**/*.{js,ts,jsx,tsx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    animation: {
      typing: 'typing 4s steps(40, end) infinite, blink-caret .75s step-end infinite',
    },
    keyframes: {
      typing: {
        '0%': { width: '0%' },
        '100%': { width: '100%' },
      },
      'blink-caret': {
        'from, to': { borderColor: 'transparent' },
        '50%': { borderColor: 'white' },
      },
    },
    colors: {
      blackBold:"#0000",
      primary: {
        50: '#fff0f3',
        100: '#ffdde3',
        200: '#ffc1cc',
        300: '#ff95a7',
        400: '#ff5975',
        500: '#ff264b',
        600: '#fc0630',
        700: '#eb0028',
        800: '#af0522',
        900: '#900c22',
        950: '#50000e',
      },
      white: "#ffffff",
      black: {
        100: "#000000",
        200: "#0000",
        300: "#333333",
        400: "#444444",
        500: "#555555",
        600: "#666666",
        700: "#777777",
        800: "#888888",
        900: "#999999",
      },
      gray: {
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
    },
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};
