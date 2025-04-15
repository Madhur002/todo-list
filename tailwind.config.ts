import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        background: 'var(--background)',
        sidebar: 'var(--sidebar-background)',
        'text-primary': 'var(--text)',
        'text-secondary': 'var(--text-secondary)',
        border: 'var(--border)',
      },
    },
  },
  plugins: [],
}
export default config
