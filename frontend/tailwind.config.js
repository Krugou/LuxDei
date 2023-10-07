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
        'spinSlightly': 'spinSlightly 4s infinite',
      },
      colors: {
        gmdeepblack: '#000000',
        gmgold: '#FFD700',
        gmdeepred: '#8B0000',
        gmcoolgray: '#808080',
        gmbondiblue: '#098eb1',
        gmairforceblue: '#52872a0',
      },
      backgroundImage: {
        'inspiskuva1': `url('./assets/images/inspiskuva1.jpg')`,
        'inspiskuva2': `url('./assets/images/inspiskuva2.jpg')`,
        'inspiskuva3': `url('./assets/images/inspiskuva3.jpg')`,
        'inspiskuva4': `url('./assets/images/inspiskuva4.jpg')`,
      },
      keyframes: {
        movementRighToLeft: {
          '0%': {transform: 'translateX(0px)'},
          '100%': {transform: 'translateX(-110vw)'},
        },
        secondmovementRighToLeft: {
          '0%': {transform: 'translateX(-20vw)'},
          '100%': {transform: 'translateX(-110vw)'},
        },
        flash: {
          '0%': {opacity: 1},
          '100%': {opacity: 0}
        },
        spinSlightly: {
          '0%': {transform: 'rotate(5deg)'},
          '50%': {transform: 'rotate(-15deg)'},
          '100%': {transform: 'rotate(15deg)'},
        },
      }

    },
  },
  plugins: [],
};
