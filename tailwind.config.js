module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the path according to your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'backdrop-blur-xl', // Add any other classes you want to ensure are not purged
  ],
}
