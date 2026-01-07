import { useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Linkedin, Terminal, Cpu, Cloud, Sun, CloudRain, Snowflake, CloudLightning, Moon, CloudMoon, Locate } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWeather } from '@/context/WeatherContext'

// Weather icon mapping
const weatherIcons = {
    sunny: Sun,
    'clear-night': Moon,
    rain: CloudRain,
    cloudy: Cloud,
    'cloudy-night': CloudMoon,
    snow: Snowflake,
    thunder: CloudLightning,
    clear: Sun, // Fallback
}

export default function HeroNeural() {
    const containerRef = useRef(null)
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 300], [1, 0])
    const scale = useTransform(scrollY, [0, 300], [1, 0.8])
    const { weatherCondition, loading, theme, permissionStatus } = useWeather()

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Get weather icon component
    const WeatherIcon = weatherIcons[weatherCondition] || (weatherCondition?.includes('night') ? Moon : Sun)

    // Dynamic glow color based on weather
    const glowStyles = {
        sunny: 'from-amber-500/20 via-orange-500/10',
        'clear-night': 'from-indigo-500/15 via-purple-500/10',
        rain: 'from-blue-500/20 via-slate-500/10',
        cloudy: 'from-purple-500/15 via-gray-500/10',
        'cloudy-night': 'from-indigo-900/20 via-slate-800/15',
        snow: 'from-cyan-500/20 via-blue-400/10',
        thunder: 'from-purple-600/25 via-blue-600/15',
        clear: 'from-primary/20 via-purple-500/10',
    }

    const currentGlow = glowStyles[weatherCondition] || glowStyles.clear

    // Grid pattern opacity based on weather
    const gridOpacity = {
        sunny: '0.08',
        'clear-night': '0.04',
        rain: '0.04',
        cloudy: '0.05',
        'cloudy-night': '0.03',
        snow: '0.06',
        thunder: '0.03',
        clear: '0.07',
    }

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
        >
            {/* Dynamic grid pattern with weather-based opacity */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] transition-opacity duration-1000"
                style={{ opacity: gridOpacity[weatherCondition] || '0.07' }}
            />

            {/* Weather-responsive ambient glow */}
            <div
                className={`absolute inset-0 bg-gradient-radial ${currentGlow} to-transparent opacity-60 transition-all duration-1000`}
                style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${theme.glowColor}, transparent 70%)`
                }}
            />

            <motion.div
                style={{ opacity, scale }}
                className="container max-w-7xl mx-auto relative z-10 px-6 text-center"
            >
                {/* Weather indicator badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="badge badge-lg badge-primary badge-outline gap-2 mb-8 p-4 backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-primary text-xs font-mono font-bold tracking-widest">
                        NEURAL_INTERFACE_ACTIVE
                    </span>
                    {!loading && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-1 ml-2 pl-2 border-l border-primary/30"
                        >
                            <WeatherIcon className="w-3 h-3 text-primary/80" />
                            <span className="text-primary/60 text-xs font-mono uppercase">
                                {weatherCondition.replace('-', ' ')}
                            </span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Permission System Message */}
                <AnimatePresence>
                    {permissionStatus === 'prompt' && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute -top-16 -translate-y-full left-1/2 -translate-x-1/2 alert alert-info bg-background/80 backdrop-blur border-primary/30 text-primary shadow-lg z-50 max-w-md w-full mx-4"
                        >
                            <Locate className="w-5 h-5 animate-pulse" />
                            <div className="text-left">
                                <p className="font-mono text-xs font-bold tracking-wider mb-0.5">SYSTEM REQUEST</p>
                                <p className="text-xs opacity-80">Allow location access to synchronize atmospheric simulation.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 md:mb-6 font-display"
                >
                    <span className="relative inline-block">
                        <span
                            className="absolute -inset-1 blur-2xl opacity-50 animate-pulse transition-colors duration-1000"
                            style={{ backgroundColor: theme.glowColor }}
                        ></span>
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
                        className="btn-primary btn-outline group relative h-14 px-8 text-lg rounded-none overflow-hidden"
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
