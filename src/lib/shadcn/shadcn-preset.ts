import type { Config } from 'tailwindcss'
//@ts-ignore
import animatePlugin from 'tailwindcss-animate'
import scrollBarPlugin from 'tailwind-scrollbar'

import { shadcnPlugin } from './shadcn-plugin'

const scrollbar = scrollBarPlugin({ nocompatible: true })
export const shadcnPreset = {
  darkMode: ['class'],
  content: [],
  plugins: [shadcnPlugin, animatePlugin, scrollbar],
} satisfies Config
