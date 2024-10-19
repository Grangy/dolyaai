// ./components/Navbar.tsx

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const navLinks = [
    { name: 'Услуги', href: '#services' },
    { name: 'О нас', href: '#about' },
    { name: 'Достижения', href: '#achievements' },
    { name: 'Контакты', href: '#contact' },
  ]

  // Блокировка прокрутки при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Сброс overflow при размонтировании
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Логотип */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Логотип"
            width={120}
            height={120}
            className="object-contain cursor-pointer"
          />
        </Link>

        {/* Меню для больших экранов */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={`nav-link-${link.name}`}
              href={link.href}
              className="text-white relative group transition-colors duration-300"
            >
              {link.name}
              {/* Подчеркивание при наведении */}
              <span
                className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"
              ></span>
            </a>
          ))}
        </div>

        {/* Кнопка меню для мобильных устройств */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Меню" className="text-white text-2xl">
            <FaBars />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900/90 backdrop-blur-md z-40 flex flex-col items-center justify-center"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {/* Кнопка закрытия меню */}
            <button
              onClick={toggleMenu}
              aria-label="Закрыть меню"
              className="absolute top-5 right-5 text-white text-3xl"
            >
              <IoClose />
            </button>

            {/* Пункты меню */}
            <nav className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <a
                  key={`mobile-nav-link-${link.name}`}
                  href={link.href}
                  className="text-white text-2xl transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
