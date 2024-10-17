// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Включение темного режима через класс
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'custom': '24px', // Пользовательское значение для закруглений
      },
      colors: {
        background: '#1a1a1a', // Темный фон
        primary: '#e63946',     // Основной красный цвет
        secondary: '#f1faee',   // Вторичный цвет
        accent: '#a8dadc',      // Акцентный цвет
        cardBg: '#262626',      // Фон карточек
      },
      animation: {
        spin: 'spin 2s linear infinite', // Стандартная анимация spin
        spinFast: 'spin 1s linear infinite', // Быстрая анимация spin
        spinSlow: 'spin 3s linear infinite', // Медленная анимация spin
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
