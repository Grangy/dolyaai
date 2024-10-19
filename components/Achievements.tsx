'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Achievements() {
  const achievementsData = [
    {
      id: 1,
      title: 'Успешный проект по автоматизации',
      description:
        'Мы помогли компании XYZ увеличить эффективность на 30% с помощью наших AI-решений.',
      image: '/main/achievement1.webp',
    },
    {
      id: 2,
      title: 'Внедрение машинного обучения',
      description:
        'Наши алгоритмы машинного обучения улучшили прогнозирование продаж для ABC Corp.',
      image: '/main/achievement2.webp',
    },
    // Добавьте дополнительные достижения по мере необходимости
  ]

  return (
    <section
      id="achievements"
      className="relative w-full py-16 bg-gradient-to-br from-purple-800 to-blue-900 flex items-center justify-center overflow-hidden"
    >
      {/* Анимированные Частички */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        {/* Здесь можно добавить SVG или Canvas для анимированных частиц */}
      </motion.div>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full z-10">
        {/* Заголовок секции */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Наши достижения
        </motion.h2>

        {/* Карточки достижений */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-custom shadow-2xl p-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
            >
              <div className="w-32 h-32 mb-6">
                <Image
                  src={achievement.image}
                  alt={achievement.title}
                  width={128}
                  height={128}
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {achievement.title}
              </h3>
              <p className="text-gray-300">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Пульсирующий круг - скрыт на мобильных устройствах */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full opacity-50 hidden md:block"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </section>
  )
}
