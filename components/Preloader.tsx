// ./components/Preloader.tsx

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Симуляция загрузки, замените на реальную логику загрузки при необходимости
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Задержка 2 секунды

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <Image
        src="/loader.png" // Путь к вашему изображению
        alt="Загрузка..."
        width={100}
        height={100}
        className="animate-spin" // Добавление анимации вращения
      />
    </div>
  )
}
