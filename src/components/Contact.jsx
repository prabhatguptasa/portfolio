import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, Linkedin, Terminal, Send, Wifi } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div ref={ref} className="min-h-screen py-20 md:py-32 px-6 relative bg-background flex items-center justify-center overflow-hidden">
      {/* Tech Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Glowing Orb Effect */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container relative z-10 max-w-5xl text-center">
        {/* Connector Line */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '128px' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute left-1/2 -top-32 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 -translate-x-1/2 hidden md:block"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Card Container */}
          <div className="card-holographic p-6 md:p-12 rounded-3xl relative overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-sm">

            {/* Scanning Effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.5)] z-20"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ opacity: isHovered ? 1 : 0.3 }}
            />

            {/* Decorative Corner Lines */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary/30 rounded-br-3xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/10 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/10 rounded-bl-3xl" />

            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-sm mb-8 font-bold tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <Wifi className="w-4 h-4" />
              // ESTABLISH_UPLINK
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight font-display">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent animate-gradient-x">Collaborate?</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Initiate a connection protocol. Whether you have a question, a project idea, or just want to say hello, my inbox is always open for new signals.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                href="https://in.linkedin.com/in/prabhat--gupta"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full h-16 px-8 text-lg rounded-xl bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_40px_rgba(var(--primary),0.5)] transition-all duration-300 group">
                  <Linkedin className="mr-3 w-6 h-6" />
                  <span className="font-mono tracking-wide">CONNECT_LINKEDIN</span>
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.a>
            </div>

            <div className="mt-16 pt-8 border-t border-border/50 flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono opacity-70">
                <Terminal className="w-3 h-3" />
                <span className="animate-pulse">Awaiting transmission...</span>
              </div>
              <div className="text-[10px] text-muted-foreground/40 font-mono">
                ID: 8473-2910-4829 // SECURE_CHANNEL
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
