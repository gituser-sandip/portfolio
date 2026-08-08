import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2rem',
        lg: '3rem',
      },
    },
    extend: {
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
      },
      colors: {
        canvas: 'hsl(var(--canvas))',
        surface: 'hsl(var(--surface))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        line: 'hsl(var(--line))',
        accent: 'hsl(var(--accent))',
      },
      boxShadow: {
        lift: '0 22px 54px rgba(0, 0, 0, 0.24)',
        glow: '0 0 0 1px rgba(239, 68, 68, 0.18), 0 20px 48px rgba(127, 29, 29, 0.22)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -18px, 0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.38' },
          '50%': { opacity: '0.72' },
        },
      },
      animation: {
        drift: 'drift 8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
