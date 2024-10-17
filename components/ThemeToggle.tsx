// ./components/ThemeToggle.tsx

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="bg-primary text-white px-4 py-2 ml-4 rounded-custom transition-colors duration-300 flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? (
          // Иконка солнца
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.22a1 1 0 011.415 0l.707.707a1 1 0 11-1.414 1.414l-.708-.707a1 1 0 010-1.414zM18 9a1 1 0 100 2h-1a1 1 0 100-2h1zM15.657 15.657a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.708-.707a1 1 0 011.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-1.22a1 1 0 00-1.414 1.414l.707.708a1 1 0 001.414-1.414l-.707-.708zM4 9a1 1 0 100 2H3a1 1 0 100-2h1zm1.343-5.657a1 1 0 00-1.414 1.414l.707.708a1 1 0 001.414-1.414l-.707-.708zM10 5a5 5 0 100 10A5 5 0 0010 5z" />
        ) : (
          // Иконка луны
          <path d="M17.293 13.293a8 8 0 11-10.586-10.586 8.001 8.001 0 0010.586 10.586z" />
        )}
      </motion.svg>
    </button>
  )
}
