'use client'

import Preloader from '../components/Preloader'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Services from '../components/Services'
import AboutUs from '../components/AboutUs'
import Achievements from '../components/Achievements' // Импортируем компонент Achievements
import ContactForm from '../components/ContactForm'

export default function Home() {
  const showLoader = process.env.NEXT_PUBLIC_SHOW_LOADER === 'true'

  return (
    <>
      {showLoader && <Preloader />}
      <Navbar />
      <div className="relative pt-16">
        <Banner />
        <Services />
        <AboutUs />
        <Achievements /> {/* Добавляем компонент Achievements */}
        <ContactForm />
      </div>
    </>
  )
}
