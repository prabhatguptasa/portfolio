import { useState, useEffect } from 'react'
import HeroNeural from './components/HeroNeural'
import About from './components/About'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
// Dynamic Weather Effect
import WeatherEffect from './components/WeatherEffect'
import { motion } from 'framer-motion'

function App() {
  const [activeSection, setActiveSection] = useState('home')

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

  return (
    <main className="min-h-screen transition-colors">
      <WeatherEffect />
      <Navigation
        activeSection={activeSection}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section id="home">
          <HeroNeural />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </motion.div>
    </main>
  )
}

export default App

