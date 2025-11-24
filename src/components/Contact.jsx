import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="min-h-screen py-24 sm:py-32 px-6 sm:px-8 relative bg-background overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute inset-0 bg-gradient-animated opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl rotate-slow" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl rotate-slow" style={{ animationDirection: 'reverse' }} />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-display font-display mb-4 text-shimmer text-tight">
              LET'S CONNECT
            </h2>
            <div className="section-divider-thick w-32 mx-auto mb-6" />
            <p className="text-subtitle font-serif text-muted-foreground max-w-2xl mx-auto text-balance italic">
              Have a project in mind? Let's collaborate and build something amazing together.
            </p>
          </motion.div>

          {/* Connect Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.a
              href="https://in.linkedin.com/in/prabhat--gupta"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="gap-2 text-lg px-8 py-6">
                Connect on LinkedIn
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
