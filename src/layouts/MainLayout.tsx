import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SharedNavbar from '../components/SharedNavbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function MainLayout() {
  return (
    <div className="relative z-10 min-h-screen bg-[#FBFBFA] text-gray-900 transition-colors duration-500 dark:bg-stone-950 dark:text-gray-100">

      <div className="relative z-10">
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
      </div>
    </div>
  )
}
