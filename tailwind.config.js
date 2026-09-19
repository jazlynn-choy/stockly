/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C1C1E',
        paper: '#FAFAF8',
        line: '#E7E5E0',
        accent: {
          DEFAULT: '#2F6F5E',
          light: '#E4EFEC',
        },
        warn: {
          DEFAULT: '#B45309',
          light: '#FBF0E1',
        },
        danger: {
          DEFAULT: '#B91C1C',
          light: '#FAE7E7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
