import { useState, useEffect, Suspense, lazy } from 'react'
import HeroNeural from './components/HeroNeural'
import Navigation from './components/Navigation'
import WeatherEffect from './components/WeatherEffect'
import Footer from './components/Footer'
import { WeatherProvider, useWeather } from '@/context/WeatherContext'
import { motion } from 'framer-motion'

// Lazy load components that are not immediately visible
const About = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))
const Contact = lazy(() => import('./components/Contact'))

// Loading fallback
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <span className="loading loading-infinity loading-lg text-primary"></span>
  </div>
)

// Inner app component that uses weather context
function AppContent() {
  const [activeSection, setActiveSection] = useState('home')
  const { weatherCondition, loading } = useWeather()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'contact']
      const scrollPosition = window.scrollY + 200

      // Check if we're at the bottom of the page
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact')
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
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dynamic weather class
  const weatherClass = loading ? '' : `weather-${weatherCondition}`

  return (
    <main className={`min-h-screen transition-colors weather-transition ${weatherClass}`}>
      {/* Weather background overlay */}
      <div className="weather-bg-overlay" aria-hidden="true" />

      <WeatherEffect />
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

        <section id="contact">
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </section>

        <Footer />
      </motion.div>
    </main>
  )
}

function App() {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  )
}

export default App
