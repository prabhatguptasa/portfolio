import { useEffect, useRef, useState } from 'react'

export default function WeatherEffect() {
    const canvasRef = useRef(null)
    const [weatherCondition, setWeatherCondition] = useState('snow') // Default to snow
    const [loading, setLoading] = useState(true)
    const hasFetched = useRef(false)

    // Fetch Weather Data
    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        const fetchWeather = async (lat, lon) => {
            try {
                const weatherRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
                )
                const weatherData = await weatherRes.json()
                const code = weatherData.current_weather.weathercode

                console.log('Weather Code:', code) // Debug log

                // Map Code to Condition
                let condition = 'clear'
                if (code >= 71 && code <= 77) condition = 'snow'
                else if (code >= 85 && code <= 86) condition = 'snow'
                else if (code >= 51 && code <= 67) condition = 'rain'
                else if (code >= 80 && code <= 82) condition = 'rain'
                else if (code >= 95 && code <= 99) condition = 'rain'
                else if (code >= 1 && code <= 3) condition = 'cloudy'
                else if (code === 45 || code === 48) condition = 'cloudy'

                setWeatherCondition(condition)
            } catch (error) {
                console.error('Weather data fetch failed:', error)
                setWeatherCondition('snow') // Fallback
            } finally {
                setLoading(false)
            }
        }

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        fetchWeather(position.coords.latitude, position.coords.longitude)
                    },
                    (error) => {
                        console.log('Geolocation denied/failed, trying IP fallback:', error)
                        fetchLocationIP()
                    }
                )
            } else {
                fetchLocationIP()
            }
        }

        const fetchLocationIP = async () => {
            try {
                const locationRes = await fetch('https://ipapi.co/json/')
                const locationData = await locationRes.json()
                const { latitude, longitude } = locationData

                if (!latitude || !longitude) throw new Error('IP Location not found')

                fetchWeather(latitude, longitude)
            } catch (error) {
                console.error('IP Location fetch failed:', error)
                setWeatherCondition('snow')
                setLoading(false)
            }
        }

        getLocation()
    }, [])

    // Animation Logic
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let particles = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()

        class Particle {
            constructor(type) {
                this.type = type
                this.reset()
                this.y = Math.random() * canvas.height
            }

            reset() {
                this.x = Math.random() * canvas.width
                this.y = -10

                if (this.type === 'snow') {
                    this.size = Math.random() * 2 + 0.5
                    this.speed = Math.random() * 0.5 + 0.2
                    this.drift = (Math.random() - 0.5) * 0.5
                    this.opacity = Math.random() * 0.5 + 0.1
                } else if (this.type === 'rain') {
                    this.size = Math.random() * 1.5 + 0.5 // Length of rain drop
                    this.speed = Math.random() * 10 + 5 // Fast
                    this.drift = 0
                    this.opacity = Math.random() * 0.3 + 0.1
                } else if (this.type === 'cloudy') {
                    this.size = Math.random() * 3 + 1 // Larger particles for fog/clouds
                    this.speed = Math.random() * 0.2 + 0.1 // Slow
                    this.drift = (Math.random() - 0.5) * 1.5 // More horizontal drift
                    this.opacity = Math.random() * 0.15 + 0.05 // Subtle
                } else { // Clear - Floating dust/data
                    this.size = Math.random() * 1.5 + 0.2
                    this.speed = Math.random() * 0.2 + 0.05
                    this.drift = (Math.random() - 0.5) * 0.2
                    this.opacity = Math.random() * 0.3 + 0.05
                    this.y = Math.random() * canvas.height // Start anywhere
                }
            }

            update() {
                this.y += this.speed
                this.x += this.drift

                if (this.type === 'clear') {
                    // Float upward/randomly for clear
                    this.y -= this.speed * 0.5
                }

                // Wrap around
                if (this.y > canvas.height) {
                    this.reset()
                } else if (this.y < -20 && (this.type === 'clear' || this.type === 'cloudy')) {
                    this.y = canvas.height + 10
                }

                if (this.x > canvas.width) this.x = 0
                else if (this.x < 0) this.x = canvas.width
            }

            draw() {
                ctx.beginPath()
                if (this.type === 'rain') {
                    ctx.rect(this.x, this.y, 1, this.size * 5) // Elongated rain drop
                } else {
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                }
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
                ctx.fill()
            }
        }

        const init = () => {
            particles = []
            let density = 15000 // Lower is more dense
            if (weatherCondition === 'rain') density = 8000
            if (weatherCondition === 'clear') density = 20000
            if (weatherCondition === 'cloudy') density = 12000

            const numberOfParticles = (canvas.width * canvas.height) / density
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle(weatherCondition))
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(particle => {
                particle.update()
                particle.draw()
            })
            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [weatherCondition])

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
