/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#153f70",
        "brand-secondary": "#3b82f6",
        "brand-tertiary-hover": "#6366f1",
        "neutral-background-secondary": "#f5f5f5",
        "neutral-text": "#1f2937",
        "neutral-text-secondary": "#6b7280",
      },
    },
  },
  plugins: [],
};