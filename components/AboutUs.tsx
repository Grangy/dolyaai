// ./components/AboutUs.tsx

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        
        {/* Изображение */}
        <motion.div
          className="w-full md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/main/ai.webp"
            alt="AI Технологии"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
            priority
          />
        </motion.div>
        
        {/* Текстовый контент */}
        <motion.div
          className="w-full md:w-1/2 text-white"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">О нас</h2>
          <p className="text-gray-400 mb-6">
            Мы — команда профессионалов, специализирующихся на разработке современных AI-решений для бизнеса. Наша миссия — помочь компаниям оптимизировать процессы, повысить эффективность и улучшить взаимодействие с клиентами с помощью передовых технологий.
          </p>
          <p className="text-gray-400 mb-6">
            Используя искусственный интеллект, мы создаем интеллектуальные чат-боты, автоматизируем рутинные задачи и предоставляем инструменты для визуализации данных, которые помогут вашему бизнесу расти и развиваться в цифровую эпоху.
          </p>
          
          {/* Интерактивные и анимационные элементы */}
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4">
            {/* Кнопка "Наши достижения" */}
            <motion.a
              href="#achievements"
              className="bg-purple-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-purple-600 transition-colors duration-300 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Наши достижения
            </motion.a>
            
            {/* Кнопка "Связаться с нами" */}
            <motion.a
              href="#contact"
              className="mt-4 sm:mt-0 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-600 transition-colors duration-300 text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Связаться с нами
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
