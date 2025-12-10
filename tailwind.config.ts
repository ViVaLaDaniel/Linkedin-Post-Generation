import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Цветовая схема LinkedIn
      colors: {
        linkedin: {
          // Основной синий LinkedIn
          primary: '#0A66C2',
          // Светлый вариант для hover
          light: '#378FE9',
          // Тёмный вариант
          dark: '#004182',
          // Фоновые цвета
          bg: {
            light: '#F3F6F8',
            white: '#FFFFFF',
          },
          // Текстовые цвета
          text: {
            primary: '#000000',
            secondary: '#666666',
            muted: '#00000099',
          },
        },
      },
      // Анимации для генерации
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-light': 'bounceLight 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
