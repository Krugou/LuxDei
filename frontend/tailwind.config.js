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
      animation: {
        'police-car': 'movementRighToLeft',
        'flash': 'flash 1s infinite',
        'robber': 'secondmovementRighToLeft',
      },
      colors: {
        example: '#464660',
        gmmidnightgreen: '#133c4b',
        gmpictonblue: '#5facd0',
        gmcastletongreen: '#1c5935',
        gmbondiblue: '#098eb1',
        gmairforceblue: '#52872a0',
      },
      backgroundImage: {
        'inspiskuva1': `url('./assets/images/inspiskuva1.jpg')`,
        'inspiskuva2': `url('./assets/images/inspiskuva2.jpg')`,
        'inspiskuva3': `url('./assets/images/inspiskuva3.jpg')`,
      },
      keyframes: {
        movementRighToLeft: {
          '0%': {transform: 'translateX(0px)'},
          '100%': {transform: 'translateX(-110vw)'},
        },
        secondmovementRighToLeft: {
          '0%': {transform: 'translateX(-50vw)'},
          '100%': {transform: 'translateX(-110vw)'},
        },
        flash: {
          '0%': {opacity: 1},
          '100%': {opacity: 0}
        }
      }

    },
  },
  plugins: [],
};
