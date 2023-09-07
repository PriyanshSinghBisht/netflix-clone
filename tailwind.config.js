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
    },
    screens:{
      'gg': '960px',
},
  },
  plugins: [],

}

