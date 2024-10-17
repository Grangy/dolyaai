// ./components/ContactForm.tsx

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  service: string
  business: string
  goals: string
  name: string
  phone: string
}

export default function ContactForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    service: '',
    business: '',
    goals: '',
    name: '',
    phone: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Автоматический переход на следующий шаг после выбора ответа
    if (step < 4) {
      setTimeout(() => {
        handleNext()
      }, 300) // Задержка для плавной анимации
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь вы можете добавить логику отправки данных на сервер
    console.log(formData)
    setIsSubmitted(true)
  }

  const progress = (step / 4) * 100

  // Придуманные вопросы и варианты ответов
  const questions = [
    {
      question: 'Какую услугу вы хотели бы использовать?',
      name: 'service',
      options: [
        'Чат-боты для бизнеса',
        'Автоматизация процессов',
        'AI для визуализации',
      ],
    },
    {
      question: 'Какой у вас бизнес?',
      name: 'business',
      options: [
        'IT/Технологии',
        'Маркетинг/Реклама',
        'Производство',
        'Другое',
      ],
    },
    {
      question: 'Какие цели вы преследуете при внедрении AI-решений?',
      name: 'goals',
      options: [
        'Повышение эффективности',
        'Улучшение клиентского сервиса',
        'Снижение затрат',
        'Другое',
      ],
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white">
          Свяжитесь с нами
        </h3>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8"
        >
          {/* Прогресс-бар */}
          <div className="mb-6">
            <div className="h-2 bg-gray-700 rounded-full">
              <motion.div
                className="h-2 bg-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">Шаг {step} из 4</p>
          </div>

          {/* Форма */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              {/* Шаг 1-3: Вопросы */}
              {step >= 1 && step <= 3 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`step-${step}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <label className="block mb-6">
                      <span className="text-gray-300 text-lg font-medium">
                        {questions[step - 1].question}
                      </span>
                      <div className="mt-4 space-y-4">
                        {questions[step - 1].options.map((option, idx) => (
                          <label key={`option-${idx}`} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={questions[step - 1].name}
                              value={option}
                              checked={formData[questions[step - 1].name as keyof FormData] === option}
                              onChange={handleChange}
                              required
                              className="form-radio h-5 w-5 text-purple-600"
                            />
                            <span className="text-gray-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    </label>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Шаг 4: Контактные данные */}
              {step === 4 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <label className="block mb-6">
                      <span className="text-gray-300 text-lg font-medium">Ваше имя</span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-3"
                        placeholder="Введите ваше имя"
                      />
                    </label>
                    <label className="block mb-6">
                      <span className="text-gray-300 text-lg font-medium">Ваш телефон</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="^\+?[1-9]\d{1,14}$"
                        className="mt-1 block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-3"
                        placeholder="+7 123 456 7890"
                      />
                    </label>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Кнопки навигации */}
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
                  >
                    Назад
                  </button>
                )}
                {step === 4 && (
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                  >
                    Отправить
                  </button>
                )}
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h4 className="text-2xl font-semibold text-white mb-4">Спасибо за ваш запрос!</h4>
              <p className="text-gray-400">Мы свяжемся с вами в ближайшее время.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
