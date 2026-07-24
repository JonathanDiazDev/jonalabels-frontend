import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function MainLayout() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-orange-50 text-gray-900 transition-colors duration-500 dark:bg-slate-950 dark:text-gray-100">

      {/* Glow layer — fixed, behind content */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="max-w-[800px] max-h-[800px] w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] rounded-full blur-[100px] animate-pulse bg-orange-400/25 dark:bg-cyan-900/25" />
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        <Navbar />

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            id="main-content"
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
