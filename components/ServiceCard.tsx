// ./components/ServiceCard.tsx

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

interface ServiceCardProps {
  src: string
  alt: string
  title: string
  description: string
  onButtonClick?: () => void // Добавили пропс для обработки клика по кнопке
}

export default function ServiceCard({ src, alt, title, description, onButtonClick }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onButtonClick) {
      onButtonClick()
    } else {
      setIsModalOpen(true)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {/* Карточка */}
      <motion.div
        className="relative w-full h-full cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onClick={handleModalOpen}
      >
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
          {/* Контейнер для изображения */}
          <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-4">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <Image
                src={src}
                alt={alt}
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-full"
                priority
              />
            </div>
          </div>
          {/* Текстовый контент */}
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-2xl font-semibold text-white mb-2">{title}</h4>
            <p className="text-gray-400 flex-1">{description}</p>
            {/* Кнопка "Это что?" */}
            <motion.button
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleModalOpen}
            >
              Это что?
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Попап по умолчанию */}
      <AnimatePresence>
        {isModalOpen && !onButtonClick && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
                aria-label="Закрыть"
              >
                <FaTimes size={20} />
              </button>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{title}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Здесь вы можете добавить более подробную информацию о данной услуге. Опишите ключевые преимущества, примеры использования, кейсы или другие важные детали, которые помогут вашим клиентам лучше понять ценность вашей услуги.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
