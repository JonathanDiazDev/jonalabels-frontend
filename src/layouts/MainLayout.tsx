import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SharedNavbar from '../components/SharedNavbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import PullToRefresh from '../components/PullToRefresh'

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

  const content = (
    <>
      <SharedNavbar />

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

      <Footer />
      <WhatsAppButton />
    </>
  )

  return (
    <div className="relative z-10 min-h-screen bg-[#FBFBFA] text-gray-900 transition-colors duration-300 dark:bg-stone-950 dark:text-gray-100">
      {isTouchDevice ? (
        <PullToRefresh onRefresh={handleRefresh}>{content}</PullToRefresh>
      ) : (
        <div className="relative z-10">{content}</div>
      )}
    </div>
  )
}
