/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FCFAF6',
          100: '#F8F4EE',
          200: '#F1EAE0',
          300: '#E9DFD2',
          400: '#DDD0BF',
        },
        charcoal: {
          200: '#C8C0B5',
          300: '#B0A89E',
          400: '#8A8278',
          500: '#6A6258',
          600: '#4A443E',
          700: '#3D3833',
          800: '#2B2723',
          900: '#1A1816',
          950: '#100E0C',
        },
        sage: {
          200: '#C8D3C0',
          300: '#B0C0A7',
          400: '#98AC8F',
          500: '#8B9A82',
          600: '#7A8B71',
          700: '#6B7B62',
        },
        peach: {
          100: '#F5E0CC',
          200: '#EFD0B0',
          300: '#E8C4A0',
          400: '#DDB088',
          500: '#D09B6F',
        },
        rose: {
          100: '#E8D5CE',
          200: '#DBC4BC',
          300: '#C9A9A0',
          400: '#B89890',
          500: '#A8857C',
        },
        ai: {
          100: '#E0E6F0',
          200: '#C5D0E0',
          300: '#A8B8D0',
          400: '#8B9DB8',
          500: '#7B8FA8',
          600: '#6B7F98',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['clamp(2.75rem, 7vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-3': ['clamp(1.75rem, 4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        'editorial': '0.04em',
        'wide-sm': '0.06em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'scale-in': 'scaleIn 0.6s ease forwards',
        'scan-line': 'scanLine 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'draw': 'drawLine 2s ease forwards',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'drift': 'drift 12s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scanLine: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.1)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(30px, -20px)' },
          '66%': { transform: 'translate(-20px, 20px)' },
        },
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
