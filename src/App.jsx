import { Suspense, lazy } from 'react'
import HeroNeural from './components/HeroNeural'
import ScrollManagedNavigation from './components/ScrollManagedNavigation'
import { motion } from 'framer-motion'

// Lazy load components that are not immediately visible
const About = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))

// Loading fallback
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <span className="loading loading-infinity loading-lg text-primary"></span>
  </div>
)

// Inner app component
function AppContent() {
  return (
    <main className="min-h-screen transition-colors">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-mono text-sm tracking-wider"
      >
        SKIP_TO_CONTENT
      </a>
      <div className="ambient-bg-overlay" aria-hidden="true" />

      <ScrollManagedNavigation />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section id="home">
          <HeroNeural />
        </section>

        <section id="about">
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
        </section>

        <section id="experience">
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
        </section>

      </motion.div>
    </main>
  )
}

function App() {
  return (
    <AppContent />
  )
}

export default App
