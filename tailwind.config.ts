import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'Inter', 'sans-serif'], 
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        brand: {
          navy: '#0F172A',
          cyan: '#0891B2',
          blue: '#2563EB',
        }
      },
      // You can easily add custom keyframes here later if you want more elite animations!
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Powers your beautiful article formatting
    require('tailwindcss-animate'),     // Powers the smooth mobile menu dropdowns
  ],
};

export default config;