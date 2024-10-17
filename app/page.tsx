// ./app/page.tsx

'use client'

import Preloader from '../components/Preloader'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Services from '../components/Services'
import AboutUs from '../components/AboutUs' // Импортируем компонент AboutUs
import ContactForm from '../components/ContactForm'

export default function Home() {
  // Корректная логика отображения лоадера
  const showLoader = process.env.NEXT_PUBLIC_SHOW_LOADER === 'true'

  return (
    <>
      {showLoader && <Preloader />} {/* Условный рендеринг лоадера */}
      <Navbar />
      <div className="relative pt-16"> {/* Добавляем отступ сверху, чтобы Navbar не перекрывал контент */}
        {/* Главный баннер */}
        <Banner />

        {/* Раздел услуг */}
        <Services />

        {/* Раздел "О нас" */}
        <AboutUs />

        {/* Форма обратной связи с квизом */}
        <ContactForm />

        {/* Дополнительные секции можно добавить здесь */}
      </div>
    </>
  )
}
