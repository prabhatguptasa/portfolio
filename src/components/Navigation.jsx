import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, User, Briefcase, Mail, Activity, Terminal } from 'lucide-react'

const navItems = [
  { id: 'home', label: 'HOME', icon: Home },
  { id: 'about', label: 'SYSTEM', icon: User },
  { id: 'experience', label: 'LOGS', icon: Briefcase },
  { id: 'contact', label: 'UPLINK', icon: Mail },
]

export default function Navigation({ activeSection }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scroll = `${totalScroll / windowHeight}`
      setScrollProgress(Number(scroll))
    }

    const timer = setInterval(() => setTime(new Date()), 1000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(timer)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Top Status Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-2 flex justify-between items-center pointer-events-none mix-blend-difference text-primary"
      >
        <div className="flex items-center gap-4 text-xs font-mono tracking-widest">
          <span className="flex items-center gap-2">
            <Activity className="w-3 h-3 animate-pulse" />
            SYSTEM_ONLINE
          </span>
          <span className="hidden sm:inline opacity-50">|</span>
          <span className="hidden sm:inline opacity-70">V.2.0.4</span>
        </div>
        <div className="text-xs font-mono tracking-widest opacity-70">
          {time.toLocaleTimeString([], { hour12: false })}
        </div>
      </motion.div>

      {/* Bottom HUD Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
          className="flex items-center gap-2 p-2 rounded-2xl bg-background/80 backdrop-blur-md border border-primary/20 shadow-[0_0_30px_-10px_rgba(var(--primary),0.3)]"
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative group"
                aria-label={`Navigate to ${item.label} section`}
              >
                <div className={`
                  relative px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-300
                  ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}
                `}>
                  <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                  <span className={`text-xs font-mono font-bold tracking-wider ${isActive ? 'block' : 'hidden sm:block'}`}>
                    {item.label}
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-xl border border-primary/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>

                {/* Hover Tooltip for Mobile (Icon only view) */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-background border border-border rounded text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none sm:hidden whitespace-nowrap">
                  {item.label}
                </div>
              </button>
            )
          })}
        </motion.div>
      </div>

      {/* Right Side Progress Bar */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="text-[10px] font-mono text-primary/50 rotate-90 origin-center translate-x-2 whitespace-nowrap">
          SCROLL_DEPTH
        </div>
        <div className="w-1 h-32 bg-secondary/30 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 w-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="text-[10px] font-mono text-primary">
          {Math.round(scrollProgress * 100)}%
        </div>
      </motion.div>

      {/* Decorative Corner Elements */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-40 opacity-30 hidden md:block">
        <div className="absolute top-6 left-6 w-2 h-2 bg-primary" />
        <div className="absolute top-6 left-10 w-20 h-px bg-primary" />
        <div className="absolute top-10 left-6 w-px h-20 bg-primary" />
      </div>

      <div className="fixed bottom-0 right-0 w-32 h-32 pointer-events-none z-40 opacity-30 hidden md:block">
        <div className="absolute bottom-6 right-6 w-2 h-2 bg-primary" />
        <div className="absolute bottom-6 right-10 w-20 h-px bg-primary" />
        <div className="absolute bottom-10 right-6 w-px h-20 bg-primary" />
      </div>
    </>
  )
}
