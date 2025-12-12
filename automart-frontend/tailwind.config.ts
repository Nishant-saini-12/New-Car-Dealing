import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class', // Changed from 'selector' to 'class' for Tailwind v3
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
