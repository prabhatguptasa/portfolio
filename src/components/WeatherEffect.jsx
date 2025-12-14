import { useEffect, useRef, useMemo } from 'react'
import { useWeather } from '@/context/WeatherContext'

export default function WeatherEffect() {
    const canvasRef = useRef(null)
    const { weatherCondition, loading, theme, windSpeed } = useWeather()

    // Memoize particle config per weather type
    const particleConfig = useMemo(() => {
        const configs = {
            sunny: {
                density: 25000,
                sizeRange: [0.5, 2],
                speedRange: [0.05, 0.15],
                driftRange: [-0.3, 0.3],
                opacityRange: [0.2, 0.5],
                shape: 'circle',
                glow: true,
                sparkle: true,
            },
            'clear-night': {
                density: 15000,
                sizeRange: [0.5, 2.5],
                speedRange: [0.01, 0.05], // Stars don't move much
                driftRange: [-0.05, 0.05],
                opacityRange: [0.3, 0.8],
                shape: 'circle',
                glow: true,
                sparkle: true, // Twinkle
                twinkleSpeed: 0.05,
            },
            rain: {
                density: 6000,
                sizeRange: [4, 12],
                speedRange: [12, 20],
                driftRange: [2, 4],
                opacityRange: [0.15, 0.4],
                shape: 'line',
                glow: false,
                splash: true,
            },
            cloudy: {
                density: 18000,
                sizeRange: [2, 6],
                speedRange: [0.1, 0.3],
                driftRange: [-1.5, 1.5],
                opacityRange: [0.05, 0.15],
                shape: 'circle',
                glow: true,
                fadeEdges: true,
            },
            'cloudy-night': {
                density: 12000,
                sizeRange: [2, 6],
                speedRange: [0.1, 0.3],
                driftRange: [-1.5, 1.5],
                opacityRange: [0.03, 0.1], // Fainter at night
                shape: 'circle',
                glow: false,
                fadeEdges: true,
            },
            snow: {
                density: 12000,
                sizeRange: [1, 4],
                speedRange: [0.3, 0.8],
                driftRange: [-0.8, 0.8],
                opacityRange: [0.3, 0.7],
                shape: 'circle',
                glow: true,
                sparkle: true,
                wobble: true,
            },
            thunder: {
                density: 5000,
                sizeRange: [5, 15],
                speedRange: [15, 25],
                driftRange: [3, 6],
                opacityRange: [0.2, 0.5],
                shape: 'line',
                glow: false,
                lightning: true,
            },
            clear: {
                density: 30000,
                sizeRange: [0.3, 1.5],
                speedRange: [0.02, 0.08],
                driftRange: [-0.2, 0.2],
                opacityRange: [0.1, 0.3],
                shape: 'circle',
                glow: true,
                float: true,
            },
        }
        return configs[weatherCondition] || configs.clear
    }, [weatherCondition])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let particles = []
        let splashes = []
        let isVisible = true
        let lastLightning = 0
        let lightningFlash = 0

        // Wind factor calculation (0 to ~3 multiplier)
        const windFactor = Math.max(0, Math.min(windSpeed, 100)) / 20

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()

        const handleScroll = () => {
            isVisible = window.scrollY <= window.innerHeight
        }
        window.addEventListener('scroll', handleScroll)

        // Helper functions
        const randomRange = (min, max) => Math.random() * (max - min) + min

        const parseColor = (colorString) => {
            const match = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
            if (match) {
                return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) }
            }
            return { r: 255, g: 255, b: 255 }
        }

        const baseColor = parseColor(theme.particleColor)

        class Particle {
            constructor() {
                this.reset()
                this.y = Math.random() * canvas.height
            }

            reset() {
                this.x = Math.random() * canvas.width
                this.y = particleConfig.shape === 'line' ? -20 : -10

                const [minSize, maxSize] = particleConfig.sizeRange
                const [minSpeed, maxSpeed] = particleConfig.speedRange
                const [minDrift, maxDrift] = particleConfig.driftRange
                const [minOpacity, maxOpacity] = particleConfig.opacityRange

                this.size = randomRange(minSize, maxSize)
                this.speed = randomRange(minSpeed, maxSpeed)
                this.drift = randomRange(minDrift, maxDrift)

                // Adjust drift based on wind speed (except for clear night stars)
                if (weatherCondition !== 'clear-night') {
                    this.drift += windFactor
                }

                this.opacity = randomRange(minOpacity, maxOpacity)
                this.baseOpacity = this.opacity

                // Additional properties for effects
                this.wobbleOffset = Math.random() * Math.PI * 2
                this.wobbleSpeed = randomRange(0.02, 0.05)
                this.sparklePhase = Math.random() * Math.PI * 2
                this.depth = Math.random() // For parallax effect
            }

            update(time) {
                this.y += this.speed * (0.5 + this.depth * 0.5)
                this.x += this.drift

                // Add wind effect to x movement directly for non-stars
                if (weatherCondition !== 'clear-night') {
                    this.x += windFactor * 0.5
                }

                // Wobble effect for snow
                if (particleConfig.wobble) {
                    this.wobbleOffset += this.wobbleSpeed
                    this.x += Math.sin(this.wobbleOffset) * 0.5
                }

                // Float effect for clear weather (upward)
                if (particleConfig.float) {
                    this.y -= this.speed * 1.5
                }

                // Sparkle effect / Twinkle
                if (particleConfig.sparkle) {
                    const speed = particleConfig.twinkleSpeed || 0.05
                    this.sparklePhase += speed
                    this.opacity = this.baseOpacity * (0.5 + Math.sin(this.sparklePhase) * 0.5)
                }

                // Wrap around
                if (this.y > canvas.height + 20) {
                    if (particleConfig.splash && Math.random() > 0.7) {
                        splashes.push(new Splash(this.x, canvas.height - 5))
                    }
                    this.reset()
                } else if (this.y < -30 && particleConfig.float) {
                    this.y = canvas.height + 20
                }

                // Wrap X (handling wind drift)
                if (this.x > canvas.width + 20) {
                    this.x = -20
                    // If it's rain/snow, maybe randomize Y a bit to avoid "lines" appearing
                    if (Math.abs(this.drift) > 2) this.y = Math.random() * canvas.height
                }
                else if (this.x < -20) {
                    this.x = canvas.width + 20
                    if (Math.abs(this.drift) > 2) this.y = Math.random() * canvas.height
                }
            }

            draw() {
                ctx.beginPath()

                // Color variation based on depth
                const colorVariation = 0.8 + this.depth * 0.4
                const r = Math.min(255, Math.floor(baseColor.r * colorVariation))
                const g = Math.min(255, Math.floor(baseColor.g * colorVariation))
                const b = Math.min(255, Math.floor(baseColor.b * colorVariation))

                if (particleConfig.shape === 'line') {
                    // Rain drop - elongated line
                    // Rotate based on wind
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`
                    ctx.lineWidth = 1 + this.depth

                    // Simple line drawing logic taking drift into account
                    ctx.moveTo(this.x, this.y)
                    const lenX = this.drift * 2 // Tilt based on drift
                    ctx.lineTo(this.x + lenX, this.y + this.size)
                    ctx.stroke()
                } else {
                    // Circle with optional glow
                    if (particleConfig.glow && this.size > 1.5) {
                        const gradient = ctx.createRadialGradient(
                            this.x, this.y, 0,
                            this.x, this.y, this.size * 3
                        )
                        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`)
                        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.3})`)
                        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
                        ctx.fillStyle = gradient
                        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
                    } else {
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                    }
                    ctx.fill()
                }
            }
        }

        class Splash {
            constructor(x, y) {
                this.x = x
                this.y = y
                this.life = 1
                this.decay = 0.05
                this.radius = 2
                this.maxRadius = randomRange(4, 8)
            }

            update() {
                this.life -= this.decay
                this.radius = this.maxRadius * (1 - this.life)
            }

            draw() {
                if (this.life <= 0) return
                ctx.beginPath()
                ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${this.life * 0.3})`
                ctx.lineWidth = 1
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                ctx.stroke()
            }

            isDead() {
                return this.life <= 0
            }
        }

        const drawLightning = () => {
            if (!particleConfig.lightning) return

            const now = Date.now()
            if (now - lastLightning > randomRange(3000, 8000)) {
                lastLightning = now
                lightningFlash = 1
            }

            if (lightningFlash > 0) {
                // Flash overlay
                ctx.fillStyle = `rgba(255, 255, 255, ${lightningFlash * 0.15})`
                ctx.fillRect(0, 0, canvas.width, canvas.height)

                // Draw lightning bolt
                if (lightningFlash > 0.8) {
                    ctx.strokeStyle = `rgba(200, 200, 255, ${lightningFlash})`
                    ctx.lineWidth = 2
                    ctx.beginPath()

                    let x = randomRange(canvas.width * 0.2, canvas.width * 0.8)
                    let y = 0
                    ctx.moveTo(x, y)

                    while (y < canvas.height * 0.7) {
                        x += randomRange(-30, 30)
                        y += randomRange(20, 50)
                        ctx.lineTo(x, y)

                        // Branch
                        if (Math.random() > 0.7) {
                            const branchX = x + randomRange(-50, 50)
                            const branchY = y + randomRange(20, 40)
                            ctx.moveTo(x, y)
                            ctx.lineTo(branchX, branchY)
                            ctx.moveTo(x, y)
                        }
                    }
                    ctx.stroke()
                }

                lightningFlash -= 0.08
            }
        }

        const init = () => {
            particles = []
            splashes = []
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / particleConfig.density)

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle())
            }
        }

        let time = 0
        const animate = () => {
            if (isVisible) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                // Draw ambient glow overlay
                if (particleConfig.glow) {
                    const gradient = ctx.createRadialGradient(
                        canvas.width / 2, canvas.height / 3, 0,
                        canvas.width / 2, canvas.height / 3, canvas.width * 0.8
                    )
                    const glowColor = parseColor(theme.glowColor)
                    gradient.addColorStop(0, `rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.1)`)
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
                    ctx.fillStyle = gradient
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                }

                // Update and draw particles
                time += 0.01
                particles.forEach(particle => {
                    particle.update(time)
                    particle.draw()
                })

                // Update and draw splashes
                splashes = splashes.filter(splash => !splash.isDead())
                splashes.forEach(splash => {
                    splash.update()
                    splash.draw()
                })

                // Lightning
                drawLightning()
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('scroll', handleScroll)
            cancelAnimationFrame(animationFrameId)
        }
    }, [weatherCondition, theme, particleConfig, windSpeed])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000"
            style={{
                mixBlendMode: 'screen',
                opacity: loading ? 0 : 1
            }}
        />
    )
}
