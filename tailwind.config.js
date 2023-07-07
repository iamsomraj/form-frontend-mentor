/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'primary-regular': ['Ubuntu-Regular', 'sans-serif'],
      'primary-bold': ['Ubuntu-Bold', 'sans-serif'],
      'primary-medium': ['Ubuntu-Medium', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
