import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { 
  User, 
  Briefcase, 
  Mail, 
  Sparkles
} from 'lucide-react'

const sections = [
  {
    id: 'about',
    title: 'About Me',
    icon: User,
    preview: '8+ Years • 15+ Projects • Skills & Expertise',
    color: 'primary',
    description: 'Discover my journey, skills, and what drives me'
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: Briefcase,
    preview: 'Gameopedia • Tech Lead • Cloud & AI Systems',
    color: 'accent',
    description: 'Explore my professional journey and achievements'
  },
  {
    id: 'contact',
    title: 'Connect',
    icon: Mail,
    preview: 'Let\'s Collaborate • Open to Opportunities',
    color: 'secondary',
    description: 'Get in touch and let\'s build something amazing'
  },
]

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredSection, setHoveredSection] = useState(null)

  useEffect(() => {
    let rafId
    const handleMouseMove = (e) => {
      // Throttle with requestAnimationFrame
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 15,
          y: (e.clientY / window.innerHeight - 0.5) * 15,
        })
        rafId = null
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background bg-gradient-animated">
      {/* Creative background patterns */}
      <div className="absolute inset-0 bg-pattern-dots opacity-30" />
      <div 
        className="absolute inset-0 bg-pattern-grid opacity-20 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      />
      
      {/* Simplified floating accent circles - CSS animations */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl float-animation" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary/20 blur-3xl float-animation" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-accent/15 blur-3xl float-animation" style={{ animationDelay: '1s' }} />

      {/* Section Navigation Dots - Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-6"
      >
        {sections.map((section, index) => {
          const Icon = section.icon
          const isHovered = hoveredSection === section.id
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              onHoverStart={() => setHoveredSection(section.id)}
              onHoverEnd={() => setHoveredSection(null)}
              onClick={() => scrollToSection(section.id)}
              className="relative group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  section.color === 'primary' ? 'border-primary bg-primary/20' :
                  section.color === 'accent' ? 'border-accent bg-accent/20' :
                  'border-secondary bg-secondary/20'
                } ${isHovered ? 'scale-125' : ''}`}
              />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
                className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
              >
                <div className={`px-4 py-2 rounded-lg backdrop-blur-sm border ${
                  section.color === 'primary' ? 'bg-primary/10 border-primary/30 text-primary' :
                  section.color === 'accent' ? 'bg-accent/10 border-accent/30 text-accent' :
                  'bg-secondary/10 border-secondary/30 text-secondary'
                }`}>
                  <p className="text-small font-heading">{section.title}</p>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Sparkle decoration - simplified */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="flex justify-center mb-6"
          >
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </motion.div>

          {/* Name - simplified */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-hero font-display mb-8"
          >
            <span className="text-shimmer text-tight">PRABHAT</span>
            <br />
            <span className="text-gradient-primary text-glow font-serif text-tight">GUPTA</span>
          </motion.h1>

          {/* Role - simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-10"
          >
            <p className="text-subtitle font-heading text-wide text-muted-foreground">
              Senior Software Engineer
            </p>
          </motion.div>

          {/* Description - simplified */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-body-large text-extra-light max-w-2xl mx-auto text-balance mb-12 text-muted-foreground"
          >
            Building cloud-native systems powered by AI
            <br />
            Leading teams to innovation
          </motion.p>

          {/* Interactive Section Previews */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onHoverStart={() => setHoveredSection(section.id)}
                  onHoverEnd={() => setHoveredSection(null)}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative group cursor-pointer p-6 rounded-xl border backdrop-blur-sm transition-all overflow-hidden ${
                    section.color === 'primary' 
                      ? 'bg-primary/5 border-primary/30 hover:bg-primary/10 hover:border-primary/50' 
                      : section.color === 'accent'
                      ? 'bg-accent/5 border-accent/30 hover:bg-accent/10 hover:border-accent/50'
                      : 'bg-secondary/5 border-secondary/30 hover:bg-secondary/10 hover:border-secondary/50'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Simple hover background */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      section.color === 'primary' 
                        ? 'bg-gradient-to-br from-primary/10 to-transparent' 
                        : section.color === 'accent'
                        ? 'bg-gradient-to-br from-accent/10 to-transparent'
                        : 'bg-gradient-to-br from-secondary/10 to-transparent'
                    }`}
                  />
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex p-3 rounded-lg mb-4 ${
                        section.color === 'primary' 
                          ? 'bg-primary/20 text-primary' 
                          : section.color === 'accent'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-secondary/20 text-secondary'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className="text-subtitle font-heading mb-2 text-foreground group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-small text-muted-foreground mb-2 text-extra-light">
                      {section.preview}
                    </p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      className={`h-0.5 ${
                        section.color === 'primary' 
                          ? 'bg-primary' 
                          : section.color === 'accent'
                          ? 'bg-accent'
                          : 'bg-secondary'
                      }`}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Scroll indicator with hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-tiny text-wide text-muted-foreground"
              >
                Scroll to explore
              </motion.p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center pt-2 hover-glow hover-scale"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                />
              </motion.div>
            </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
