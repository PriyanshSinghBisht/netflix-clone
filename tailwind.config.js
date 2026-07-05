/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#1f1f1f',
          hover: '#2a2a2a',
          alt: '#27272a',
          elevated: '#2c2c2c',
        },
        border: {
          DEFAULT: '#333333',
          hover: '#444444',
          active: '#555555',
        },
        primary: {
          DEFAULT: '#E50914',
          hover: '#ff1f2c',
          muted: 'rgba(229, 9, 20, 0.1)',
          subtle: 'rgba(229, 9, 20, 0.15)',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a0a0a0',
          muted: '#6b6b6b',
        },
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      animation: {
        rotate: 'rotate 1s linear infinite',
        skeleton: 'skeleton 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
      },
      keyframes: {
        rotate: {
          from: { rotate: '0deg' },
          to: { rotate: '360deg' },
        },
        skeleton: {
          '0%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '0.3' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
      },
    },
    screens: {
      'gg': '960px',
      'sm': '400px',
    },
  },
  plugins: [],
}
