import type { Config } from 'tailwindcss'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { shadcnPreset } from './src/lib/shadcn/shadcn-preset'

const config = {
  presets: [shadcnPreset],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#001529',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
} satisfies Config

export default config
