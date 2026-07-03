import { useState, useEffect } from 'react'
import Navigation from './Navigation'

/**
 * ScrollManagedNavigation isolates high-frequency scroll state updates
 * to prevent re-rendering the entire App component tree.
 *
 * BOLT OPTIMIZATION: 2025-05-15
 */
export default function ScrollManagedNavigation() {
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

  return <Navigation activeSection={activeSection} />
}
