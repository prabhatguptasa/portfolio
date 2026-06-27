import { useState, useEffect, Suspense, lazy } from 'react'
import HeroNeural from './components/HeroNeural'
import Navigation from './components/Navigation'
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

// Inner app component that uses weather context
function AppContent() {
  const [activeSection, setActiveSection] = useState('home')
  useEffect(() => {
    let timeoutId = null

    const handleScroll = () => {
      if (timeoutId) return

      timeoutId = setTimeout(() => {
        const sections = ['home', 'about', 'experience']
        const scrollPosition = window.scrollY + 200

        // Check if we're at the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
          setActiveSection('experience')
          timeoutId = null
          return
        }

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
        timeoutId = null
      }, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <main className="min-h-screen transition-colors">
      <div className="ambient-bg-overlay" aria-hidden="true" />

      <Navigation activeSection={activeSection} />

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
