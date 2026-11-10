/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdcff',
          300: '#8ec6ff',
          400: '#59a5ff',
          500: '#2f7fff',
          600: '#1a5ff5',
          700: '#1349e1',
          800: '#163cb6',
          900: '#18378f',
          950: '#122357',
        },
        accent: { 500: '#0f766e', 600: '#115e59' }
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(15, 23, 42, 0.18)',
      }
    },
  },
  plugins: [],
}
