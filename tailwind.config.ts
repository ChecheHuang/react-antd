import type { Config } from 'tailwindcss'
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'lightblue',
          dark: 'darkblue',
          light: 'lightblue',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
export default config
