// ./components/Navbar.tsx

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaBars, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
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
    { name: 'Контакты', href: '#contact' },
  ]

  return (
    <nav className="bg-gray-900 fixed w-full z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Логотип */}
        <Link href="/">
          <Image
            src="/logo.png" // Обновите путь к логотипу, если необходимо
            alt="Логотип"
            width={150}
            height={150}
            className="object-contain cursor-pointer"
          />
        </Link>
        
        {/* Меню для больших экранов */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link key={`nav-link-${link.name}`} href={link.href} className="text-white hover:text-purple-500 transition-colors duration-300">
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Кнопка меню для мобильных устройств */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Меню">
            {isOpen ? <FaTimes className="text-white text-2xl" /> : <FaBars className="text-white text-2xl" />}
          </button>
        </div>
      </div>
      
      {/* Мобильное меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-gray-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center space-y-4 py-4">
              {navLinks.map((link) => (
                <li key={`mobile-nav-link-${link.name}`}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-purple-500 transition-colors duration-300"
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
