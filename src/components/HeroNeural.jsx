import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Linkedin, Terminal, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroNeural() {
    const containerRef = useRef(null)
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 300], [1, 0])
    const scale = useTransform(scrollY, [0, 300], [1, 0.8])

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
        >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <motion.div
                style={{ opacity, scale }}
                className="container max-w-7xl mx-auto relative z-10 px-6 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-primary text-xs font-mono font-bold tracking-widest">
                        NEURAL_INTERFACE_ACTIVE
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 md:mb-6 font-display"
                >
                    <span className="relative inline-block">
                        <span className="absolute -inset-1 bg-primary/20 blur-2xl opacity-50 animate-pulse"></span>
                        <span className="relative text-foreground">
                            PRABHAT
                        </span>
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient-x">
                        GUPTA
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="max-w-2xl mx-auto mb-8 space-y-4"
                >
                    <div className="flex items-center justify-center gap-3 text-muted-foreground font-mono text-sm md:text-base">
                        <Cpu className="w-4 h-4 text-primary" />
                        <span>Architecting Intelligence</span>
                        <span className="text-primary">•</span>
                        <span>Cloud Native</span>
                        <span className="text-primary">•</span>
                        <span>System Design</span>
                    </div>
                    <p className="text-xl md:text-2xl text-muted-foreground font-light">
                        Senior Software Engineer & Tech Lead
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
                >
                    <Button
                        size="lg"
                        className="group relative h-14 px-8 text-lg rounded-none border border-primary bg-primary/10 hover:bg-primary/20 text-primary overflow-hidden"
                        onClick={() => scrollToSection('contact')}
                    >
                        <div className="absolute inset-0 w-1 bg-primary transition-all duration-300 group-hover:w-full opacity-10" />
                        <span className="relative flex items-center gap-2 font-mono tracking-wider">
                            <Terminal className="w-5 h-5" />
                            INITIALIZE_UPLINK
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Button>

                    <div className="flex gap-4">
                        <a
                            href="https://in.linkedin.com/in/prabhat--gupta"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                        >
                            <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </a>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer group"
                    onClick={() => scrollToSection('about')}
                >
                    <div className="w-px h-16 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 group-hover:via-primary transition-colors relative overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
                            animate={{ y: ['-100%', '200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
