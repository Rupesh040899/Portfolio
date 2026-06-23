/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        elevated: 'rgb(var(--c-elevated) / <alpha-value>)',
        border: 'rgb(var(--c-border) / <alpha-value>)',
        text: 'rgb(var(--c-text) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--c-accent) / 0.14)',
        // Aurora palette (used directly in gradients)
        aurora: {
          green: '#34d399',
          teal: '#2dd4bf',
          cyan: '#22d3ee',
          blue: '#60a5fa',
          violet: '#a78bfa',
          pink: '#e879f9',
        },
      },
      fontFamily: {
        sans: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'aurora-drift': {
          '0%,100%': { transform: 'translate3d(-10%,0,0) skewX(-8deg)', opacity: '0.55' },
          '50%': { transform: 'translate3d(10%,4%,0) skewX(6deg)', opacity: '0.85' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.2' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        'aurora-drift': 'aurora-drift 16s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
