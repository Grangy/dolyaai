// ./components/ai/PopupBot.tsx

'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaPaperPlane } from 'react-icons/fa'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

interface PopupBotProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: number
  sender: 'user' | 'bot'
  text: string
}

export default function PopupBot({ isOpen, onClose }: PopupBotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showInitialOptions, setShowInitialOptions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Начальное сообщение от бота при открытии
  useEffect(() => {
    if (isOpen) {
      setMessages([
        { id: 1, sender: 'bot', text: 'Здравствуйте! Я ваш AI-помощник. Я могу тебе рассказать как я могу помочь в бизнесе или проектах?' },
      ])
      setShowInitialOptions(true)
    } else {
      setMessages([])
      setInputValue('')
      setShowInitialOptions(false)
      setIsLoading(false)
    }
  }, [isOpen])

  // Прокрутка вниз при добавлении новых сообщений
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInputValue('')
    setIsLoading(true)

    // Форматируем сообщения для OpenAI API
    const formattedMessages = updatedMessages.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }))

    // Отправляем запрос к нашему API
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: formattedMessages }),
      })

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }

      const data = await response.json()

      const botMessage: Message = {
        id: updatedMessages.length + 1,
        sender: 'bot',
        text: data.reply || 'Извините, произошла ошибка при получении ответа.',
      }

      setMessages((prevMessages) => [...prevMessages, botMessage])
    } catch (error) {
      console.error('Ошибка при получении ответа от бота:', error)
      const errorMessage: Message = {
        id: updatedMessages.length + 1,
        sender: 'bot',
        text: 'Извините, произошла ошибка при обработке вашего запроса.',
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  // Обработчики для кнопок
  const handleOptionYes = async () => {
    setShowInitialOptions(false)
    setIsLoading(true)

    const botQuestion = 'Расскажи о себе и чем ИИ помогает бизнес-процессам'

    // Форматируем сообщения для OpenAI API
    const formattedMessages = [
      ...messages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
      {
        role: 'user',
        content: botQuestion,
      },
    ]

    // Отправляем запрос к нашему API
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: formattedMessages }),
      })

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`)
      }

      const data = await response.json()

      const botMessage: Message = {
        id: messages.length + 1,
        sender: 'bot',
        text: data.reply || 'Извините, произошла ошибка при получении ответа.',
      }

      setMessages((prevMessages) => [...prevMessages, botMessage])
    } catch (error) {
      console.error('Ошибка при получении ответа от бота:', error)
      const errorMessage: Message = {
        id: messages.length + 1,
        sender: 'bot',
        text: 'Извините, произошла ошибка при обработке вашего запроса.',
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleOptionNo = () => {
    setShowInitialOptions(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full h-3/4 flex flex-col overflow-hidden relative"
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Чат-бот</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Закрыть"
              >
                <FaTimes size={20} />
              </button>
            </div>
            {/* Сообщения */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.sender === 'bot'
                      ? parse(DOMPurify.sanitize(message.text))
                      : message.text}
                  </div>
                </div>
              ))}

              {/* Отображение кнопок после первого сообщения от бота */}
              {showInitialOptions && (
                <motion.div
                  className="mb-4 flex justify-start space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button
                    onClick={handleOptionYes}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Да, давай
                  </button>
                  <button
                    onClick={handleOptionNo}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
                  >
                    Нет
                  </button>
                </motion.div>
              )}

              {isLoading && (
                <div className="mb-4 flex justify-start">
                  <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                    Бот печатает...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            {/* Поле ввода */}
            <div className="p-4 bg-gray-100 flex items-center">
              <input
                type="text"
                className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none text-black"
                placeholder="Введите сообщение..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleInputKeyPress}
              />
              <button
                onClick={handleSendMessage}
                className="bg-purple-500 text-white px-4 py-2 rounded-r-lg hover:bg-purple-600 focus:outline-none"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
