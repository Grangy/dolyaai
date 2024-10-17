// ./components/Services.tsx

'use client'

import { motion } from 'framer-motion'
import ServiceCard from './ServiceCard'

// Данные для услуг
const servicesData = [
  {
    id: 1,
    src: '/main/bot.webp',
    alt: 'Чат-боты для бизнеса',
    title: 'Чат-боты для бизнеса',
    description: 'Интеллектуальные чат-боты для автоматизации взаимодействия с клиентами и повышения эффективности обслуживания.',
  },
  {
    id: 2,
    src: '/main/proccess.webp',
    alt: 'Автоматизация процессов',
    title: 'Автоматизация процессов',
    description: 'Оптимизация работы с таблицами, документами и регламентами с помощью AI для снижения затрат и повышения продуктивности.',
  },
  {
    id: 3,
    src: '/main/visio.webp',
    alt: 'AI для визуализации',
    title: 'AI для визуализации',
    description: 'Использование искусственного интеллекта для создания высококачественных визуализаций и улучшения презентаций.',
  },
  // Добавьте больше объектов по необходимости
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white">
          Наши Услуги
        </h3>
        <div className="flex flex-wrap -mx-4">
          {servicesData.map((service, index) => (
            <motion.div
              key={`service-${service.id}`} // Обновлённый ключ
              className="w-full md:w-1/3 px-4 mb-12 flex items-stretch"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                src={service.src}
                alt={service.alt}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
