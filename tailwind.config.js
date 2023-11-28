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
      },
      keyframes:{
         rotate:{
           from:{rotate: '0deg'},
           to: {rotate: '360deg'}
         },
      }
    },
    screens:{
      'gg': '960px',
},
  },
  plugins: [],

}

