// ./components/ClientProviders.tsx

'use client'

import { ReactNode } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import { AnimatePresence } from 'framer-motion'

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ParallaxProvider>
      <AnimatePresence>{children}</AnimatePresence>
    </ParallaxProvider>
  )
}
