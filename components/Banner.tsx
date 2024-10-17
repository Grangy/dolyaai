// ./components/Banner.tsx

'use client'

import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

export default function Banner() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-900 to-purple-800 flex items-center justify-center overflow-hidden">
      
      {/* Анимированные Частички */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
      >
        {/* Здесь можно добавить SVG или Canvas для анимированных частиц */}
      </motion.div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between h-full z-10 pt-16 md:pt-0">
        
        {/* Текстовый оффер и CTA */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            AI-Решения для бизнеса
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Инновационные инструменты на базе искусственного интеллекта для оптимизации ваших проектов и бизнеса.
          </p>
          <a
            href="#services"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-500 hover:to-purple-500 transition-colors duration-300 shadow-lg transform hover:scale-105 w-full md:w-auto"
          >
            Узнать больше <FaArrowRight className="ml-3" />
          </a>
        </motion.div>
        
        {/* Видео */}
        <motion.div
          className="relative w-full md:w-1/2 h-48 md:h-auto rounded-custom overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <video
            src="/video.mp4" // Локальный путь к видео
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
            aria-label="Видео о AI-решениях"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </motion.div>
      </div>

      {/* Пульсирующий круг - скрыт на мобильных устройствах */}
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full opacity-50 hidden md:block"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </section>
  )
}
