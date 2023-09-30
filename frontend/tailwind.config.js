/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    // ...
  },

  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      backgroundImage: {},
      colors: {
        example: '#464660',
        gmmidnightgreen: '#133c4b',
        gmpictonblue: '#5facd0',
        gmcastletongreen: '#1c5935',
        gmbondiblue: '#098eb1',
        gmairforceblue: '#52872a0',
      },
    },
  },
  plugins: [],
};
