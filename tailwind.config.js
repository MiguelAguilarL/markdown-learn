/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [{ pattern: /^(alert|alert-(note|tip|important|warning|caution))$/ }],
  theme: { extend: {} },
  plugins: []
};
