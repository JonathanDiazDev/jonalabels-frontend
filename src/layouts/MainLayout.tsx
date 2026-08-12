import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import SharedNavbar from '../components/SharedNavbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import PullToRefresh from '../components/PullToRefresh'
import PageBackground from '../components/PageBackground'

function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: none), (pointer: coarse)').matches
      : false,
  )

  useEffect(() => {
    const mql = window.matchMedia('(hover: none), (pointer: coarse)')
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isTouch
}

const handleRefresh = () => {
  window.scrollTo({ top: 0 })
  window.location.reload()
}

export default function MainLayout() {
  const isTouchDevice = useIsTouchDevice()
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  const content = (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-stone-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Ir al contenido principal
      </a>

      <SharedNavbar />

      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait">
          <motion.main
            id="main-content"
            className="relative z-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </MotionConfig>

      <Footer />
      <WhatsAppButton />
    </>
  )

  return (
    <div className="page-scrim relative z-10 min-h-screen bg-stone-50/80 text-gray-900 transition-colors duration-300 dark:bg-stone-950/80 dark:text-gray-100">
      <PageBackground />
      {isTouchDevice && isLanding ? (
        <PullToRefresh onRefresh={handleRefresh}>{content}</PullToRefresh>
      ) : (
        <div className="relative z-10">{content}</div>
      )}
    </div>
  )
}
