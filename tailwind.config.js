/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '2/3': '2 / 3',
      },
      animation:{
        rotate: 'rotate 1s linear infinite',
        skeleton: 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes:{
         rotate:{
           from:{rotate: '0deg'},
           to: {rotate: '360deg'}
         },
         skeleton:{
           '0%': {opacity: '0.3'},
           '50%': {opacity: '0.7'},
           '100%': {opacity: '0.3'},
         },
      }
    },
    screens:{
      'gg': '960px',
      'sm': '400px',
},
  },
  plugins: [],

}

